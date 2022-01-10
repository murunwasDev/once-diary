<script>
  import Header from "$lib/components/Header.svelte";
</script>

<Header />
<main class="container">
  <slot />
</main>

<style>
  /* THEME */
  :global(:root) {
    --clr-primary: hsl(0, 68%, 42%);
  }
  /* GLOBAL */
  :global(.container) {
    width: min(90%, 80rem);
    margin: 0 auto;
  }

  /* RESET */
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(html, body) {
    font-family: sans-serif;
    line-height: 1.4;
    font-size: 16px;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  :global(ol, ul) {
    list-style: none;
  }

  :global(img) {
    max-width: 100%;
    height: auto;
  }

  :global(input, textarea, button) {
    font-family: inherit;
    font-size: 0.9rem;
  }

  :global(button) {
    border: none;
    background: none;
  }
</style>
