import { writable } from "svelte/store";

export const posts = writable<AsyncStore<PostWithAuthor[]>>({
  data: {
    info: {},
    results: []
  },
  error: "",
  loading: false
});

export const getPosts = async ({ cursor, limit }: { cursor?: string; limit?: number }) => {
  posts.update(prev => ({ ...prev, loading: true }));

  try {
    const res = await fetch(`/api/posts?cursor=${cursor || ""}&limit=${limit}`);
    const data: APIResponse<PostWithAuthor[]> = await res.json();

    posts.update(prev => ({
      ...prev,
      data: {
        info: {
          cursor: data.info.cursor,
          hasNextPage: data.info.hasNextPage,
          count: data.info.count
        },
        results: [...prev.data.results, ...data.results]
      },
      loading: false
    }));
  } catch (error) {
    posts.update(prev => ({ ...prev, error: error.message, loading: false }));
  }
};

export const createPost = async (title: string, content: string, userId: string) => {
  posts.update(prev => ({ ...prev, loading: true }));
  const res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, content, userId })
  });
  const error = await res.text();

  if (res.ok) {
    posts.update(prev => ({ ...prev, loading: false }));
    location.replace("/");
  } else {
    posts.update(prev => ({ ...prev, error, loading: false }));
  }
};
