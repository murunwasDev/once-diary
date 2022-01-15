<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Field from "$lib/components/Field.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import { auth, register } from "$lib/stores/auth";

  let email = "";
  let password = "";
</script>

<form on:submit|preventDefault={() => register(email, password)}>
  <h2>Register for an account</h2>
  <p>Sign up for an account and share your one thought with the world</p>

  <Field props={{ type: "email", label: "Email" }} bind:value={email} />
  <Field
    props={{ type: "password", label: "Password" }}
    bind:value={password}
  />
  <Button
    props={{
      variant: "primary",
      type: "submit",
      disabled: !email || !password || $auth.loading
    }}
  >
    {$auth.loading ? "Creating your account.." : "Register"}
  </Button>
  <p>Already have have an account? <a href="/login">Login</a></p>
</form>

{#if $auth.error.length > 0}
  <Toast
    props={{ variant: "error", messsage: $auth.error }}
    on:dismiss={() => ($auth.error = "")}
  />
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 25rem;
    margin: 0 auto;
    gap: 1.4rem;
  }

  a {
    color: var(--clr-primary);
    text-decoration: underline;
  }
</style>
