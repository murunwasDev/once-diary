<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Field from "$lib/components/Field.svelte";
  let submitting = false;
</script>

<form action="/api/login" method="post" on:submit={() => (submitting = true)}>
  <h2>Login to your account</h2>
  <p>Here you can re-login if you haven't created your thought already</p>

  <Field props={{ type: "email", label: "Email", name: "email" }} value="" />
  <Field
    props={{ type: "password", label: "Password", name: "password" }}
    value=""
  />
  <Button
    props={{
      variant: "primary",
      type: "submit",
      disabled: submitting
    }}
  >
    {submitting ? "Logging in..." : "Login"}
  </Button>
  <p>Don't have an account? <a href="/register">Register</a></p>
</form>

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
