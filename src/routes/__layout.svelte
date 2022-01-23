<script>
  import Header from "$lib/components/Header.svelte";
</script>

<Header />
<main class="container">
  <slot />
</main>

<style global>
  :root {
    --clr-primary: hsl(0, 68%, 42%);
  }

  .container {
    width: min(90%, 80rem);
    margin: 0 auto;
  }

  /* RESET */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: sans-serif;
    line-height: 1.4;
    font-size: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ol,
  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input,
  textarea,
  button {
    font-family: inherit;
    font-size: 0.9rem;
  }

  button {
    border: none;
    background: none;
  }
</style>
