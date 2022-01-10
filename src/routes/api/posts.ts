import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/db";

export const get: RequestHandler = async ({ url }) => {
  let query = null;
  const cursor = url.searchParams.get("cursor");
  const limit = Number(url.searchParams.get("limit"));

  if (cursor.length > 0) {
    query = await db.post.findMany({
      take: limit,
      skip: 1,
      orderBy: {
        createdAt: "desc"
      },
      cursor: {
        id: cursor
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: { select: { email: true } }
      }
    });
  } else {
    query = await db.post.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: { select: { email: true } }
      }
    });
  }

  if (query.length > 0) {
    const lastPost = query[query.length - 1];
    const cursor = lastPost.id;

    const secondQuery = await db.post.findMany({
      take: limit,
      cursor: {
        id: cursor
      }
    });

    return {
      status: 200,
      body: {
        info: {
          cursor,
          hasNextPage: secondQuery.length > 0,
          count: await db.post.count()
        },
        results: query
      }
    };
  }

  return {
    status: 200,
    body: {
      info: {
        cursor: null,
        hasNextPage: false,
        count: await db.post.count()
      },
      results: []
    }
  };
};

export const post: RequestHandler = async ({ body }) => {
  const data = JSON.parse(body as string);
  const title = data.title;
  const content = data.content;
  const userId = data.userId;

  const post = await db.post.create({
    data: {
      title,
      content,
      author: {
        connect: { id: userId }
      }
    }
  });
  await db.user.update({
    where: { id: userId },
    data: { hasCreatedPost: true }
  });

  return {
    status: 200,
    body: "Successfully created post"
  };
};
