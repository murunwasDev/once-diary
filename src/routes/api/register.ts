import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/utils/prisma";
import argon2 from "argon2";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const post: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const { email, password } = Object.fromEntries(body as any);

  const user = await prisma.user.findFirst({
    where: { email }
  });
  if (user) {
    return {
      body: `User with email ${email} already exists`
    };
  }

  if (password.length < 6) {
    return {
      body: "Password is less than 6 characters"
    };
  }

  const hashPassword = await argon2.hash(password);
  const newUser = await prisma.user.create({
    data: { email, password: hashPassword }
  });

  const token = jwt.sign(
    { id: newUser.id, tokenVersion: newUser.tokenVersion },
    import.meta.env.VITE_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return {
    status: 307,
    headers: {
      location: "/",
      "set-cookie": cookie.serialize("token", token, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/"
      })
    }
  };
};
