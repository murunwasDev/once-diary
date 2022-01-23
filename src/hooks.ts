import type { GetSession, Handle } from "@sveltejs/kit";
import prisma from "$lib/utils/prisma";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const handle: Handle = async ({ event, resolve }) => {
  const { token } = cookie.parse(event.request.headers.get("cookie"));
  if (!token) return resolve(event);

  let data;
  try {
    data = jwt.verify(token, import.meta.env.VITE_TOKEN_SECRET);
  } catch (error) {
    return resolve(event);
  }

  const user = await prisma.user.findFirst({
    where: { id: data.id }
  });
  if (!user || user.tokenVersion !== data.tokenVersion) return resolve(event);

  event.locals.authenticated = true;
  event.locals.user = user;
  return resolve(event);
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
