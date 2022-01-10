<script lang="ts">
  import { session } from "$app/stores";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
</script>

<header>
  <nav class="container">
    <a href="/">
      <Icon props={{ type: "book" }} />
      <h1>Once Diary</h1>
    </a>
    <ul>
      {#if $session}
        <li>{$session.email}</li>
        <li>
          {#if !$session.hasCreatedPost}
            <a href="/create">Create post</a>
          {/if}
        </li>
        <li>
          <form action="/api/logout" method="post">
            <Button props={{ variant: "secondary", type: "submit" }}>Logout</Button>
          </form>
        </li>
      {:else}
        <li>
          <Button props={{ variant: "secondary", link: true, href: "/login" }}>Login</Button>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  header {
    background-color: var(--clr-primary);
    color: white;
    padding: 1.4rem 0;
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a,
  ul {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
</style>
