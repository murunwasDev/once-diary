<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ session }) => {
    if (!session) {
      return { status: 307, redirect: "/login" };
    } else if (session.hasCreatedPost) {
      return { status: 307, redirect: "/" };
    } else {
      return { props: { session } };
    }
  };
</script>

<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Field from "$lib/components/Field.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import { posts, createPost } from "$lib/stores/posts";
  export let session: UserSession;

  let title = "";
  let content = "";
</script>

<form on:submit|preventDefault={() => createPost(title, content, session.id)}>
  <h2>Share your one and only thought with the world</h2>
  <p>Here you can create your thought and share it with the world</p>

  <Field props={{ type: "text", label: "Title", required: true }} bind:value={title} />
  <Field props={{ type: "textarea", label: "Content", required: true }} bind:value={content} />
  <Button props={{ variant: "primary", type: "submit", disabled: $posts.loading }}>
    {$posts.loading ? "Creating..." : "Create post"}
  </Button>
</form>

{#if $posts.error.length > 0}
  <Toast
    props={{ variant: "error", messsage: $posts.error }}
    on:dismiss={() => ($posts.error = "")}
  />
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 40rem;
    margin: 0 auto;
    gap: 1.4rem;
  }
</style>
