import type { GetSession, Handle } from "@sveltejs/kit";
import { db } from "$lib/utils/db";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const handle: Handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  const token = cookies.token;
  if (!token) return resolve(request);

  let data;
  try {
    data = jwt.verify(token, import.meta.env.VITE_TOKEN_SECRET);
  } catch (error) {
    return resolve(request);
  }

  const user = await db.user.findFirst({
    where: { id: data.id }
  });
  if (!user || user.tokenVersion !== data.tokenVersion) return resolve(request);

  request.locals.authenticated = true;
  request.locals.user = user;
  return resolve(request);
};

export const getSession: GetSession = ({ locals }) => {
  return locals.authenticated
    ? {
        id: locals.user.id,
        email: locals.user.email,
        hasCreatedPost: locals.user.hasCreatedPost
      }
    : null;
};
