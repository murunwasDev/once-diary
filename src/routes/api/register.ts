import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/db";
import argon2 from "argon2";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const post: RequestHandler = async ({ body }) => {
  const data = JSON.parse(body as string);
  const email = data.email;
  const password = data.password;

  const user = await db.user.findFirst({
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
  const newUser = await db.user.create({
    data: { email, password: hashPassword }
  });

  const token = jwt.sign(
    { id: newUser.id, tokenVersion: newUser.tokenVersion },
    import.meta.env.VITE_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return {
    status: 200,
    headers: {
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
