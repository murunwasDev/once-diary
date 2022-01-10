import type { RequestHandler } from "@sveltejs/kit";
import { serialize } from "cookie";

export const post: RequestHandler = () => {
  return {
    status: 307,
    headers: {
      location: "/login",
      "set-cookie": serialize("token", "", { maxAge: 0, path: "/" })
    }
  };
};
