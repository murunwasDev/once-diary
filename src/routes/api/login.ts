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
  if (!user) {
    return {
      status: 400,
      body: `User with email ${email} does not exist`
    };
  }

  const verifyPassword = await argon2.verify(user.password, password);
  if (!verifyPassword) {
    return {
      status: 400,
      body: "Password is invalid"
    };
  }

  const token = jwt.sign(
    { id: user.id, tokenVersion: user.tokenVersion },
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
