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
