<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  import { posts, getPosts } from "$lib/stores/posts";

  export const load: Load = async ({ session }) => {
    if (!session) {
      return { status: 307, redirect: "/login" };
    } else {
      await getPosts({ limit: 2 });
      return { props: { session } };
    }
  };
</script>

<script lang="ts">
  import { greeting } from "$lib/utils/helpers";
  import Post from "$lib/components/Post.svelte";
  import { chart } from "$lib/actions/chart";
  import Button from "$lib/components/Button.svelte";

  export let session: UserSession;
</script>

<section>
  <h2>{greeting()}, {session.email}</h2>
  <p>Here's a couple of thoughts other people have shared recently:</p>
</section>

<div>
  <section>
    {#each $posts.data.results as post (post.id)}
      <Post {post} />
    {/each}
  </section>

  <Button
    props={{
      variant: "primary",
      disabled: $posts.loading || !$posts.data.info.hasNextPage,
      onClick: () => getPosts({ cursor: $posts.data.info.cursor, limit: 2 })
    }}
    >{$posts.loading
      ? "Loading..."
      : !$posts.data.info.hasNextPage
      ? "No more posts avaliable"
      : "Load more posts"}</Button
  >

  {#if $posts.loading}
    <p>Loading...</p>
  {:else if $posts.error.length > 0}
    <p>{$posts.error}</p>
  {/if}
</div>

{#if $posts.data.info.count}
  <canvas
    use:chart={{
      labels: ["2021-22", "2022-23"],
      type: "line",
      datasets: [
        {
          label: "Shared thoughts this year",
          backgroundColor: "firebrick",
          borderColor: "firebrick",
          data: [0, $posts.data.info.count]
        }
      ]
    }}
  />
{/if}

<style>
  div {
    margin-bottom: 2rem;
  }

  section {
    display: grid;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  canvas {
    margin-bottom: 2rem;
  }
</style>
