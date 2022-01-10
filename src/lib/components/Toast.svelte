<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import Icon from "./Icon.svelte";

  export let props: ToastProps;
  const dispatch = createEventDispatcher();
</script>

<aside
  transition:fly={{ y: 50 }}
  style={`--bg: ${props.variant === "success" ? "green" : "firebrick"}`}
>
  {#if props.variant === "success"}
    <Icon props={{ type: "tick", fill: "white" }} />
  {:else if props.variant === "error"}
    <Icon props={{ type: "cross", fill: "white" }} />
  {/if}
  <p>{props.messsage}</p>
  <button on:click={() => dispatch("dismiss")}>X</button>
</aside>

<style>
  aside {
    --bg: blue;
    position: absolute;
    inset: auto 50% 2rem auto;
    transform: translateX(50%);
    background-color: var(--bg);
    color: white;
    padding: 0.8rem 1.2rem;
    border-radius: 0.4rem;
    box-shadow: 0.2rem 0 8rem hsla(0, 0%, 0%, 0.2);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
