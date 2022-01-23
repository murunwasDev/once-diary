<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Field from "$lib/components/Field.svelte";
  let submitting = false;
</script>

<form
  action="/api/register"
  method="post"
  on:submit={() => (submitting = true)}
>
  <h2>Register for an account</h2>
  <p>Sign up for an account and share your one thought with the world</p>

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
    {submitting ? "Creating your account.." : "Register"}
  </Button>
  <p>Already have have an account? <a href="/login">Login</a></p>
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
