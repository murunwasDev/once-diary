<script lang="ts">
  export let props: ButtonProps;
</script>

{#if props.link}
  <a href={props.href} class={`btn ${props.variant === "primary" ? "primary" : "secondary"}`}>
    <slot />
  </a>
{:else}
  <button
    disabled={props.disabled}
    type={props.type}
    class={`btn ${props.variant === "primary" ? "primary" : "secondary"}`}
    on:click={props.onClick}
  >
    <slot />
  </button>
{/if}

<style>
  .btn {
    display: block;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.4rem;
    transition: 0.15s ease-out;
    cursor: pointer;
  }
  .btn:hover {
    opacity: 0.9;
    transform: scale(0.95);
  }
  .btn:disabled {
    opacity: 0.4;
  }

  .primary {
    background-color: var(--clr-primary);
    color: white;
  }

  .secondary {
    background-color: white;
    color: var(--clr-primary);
  }
</style>
