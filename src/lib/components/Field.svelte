<script lang="ts">
  export let props: FieldProps;
  export let value: any;

  const inputHandler = (e: any) => {
    value = e.target.value;
  };
</script>

<div>
  <label for={props.label}>{props.label}</label>
  {#if props.type === "textarea"}
    <textarea
      name={props.name}
      id={props.label}
      required={props.required}
      {value}
      on:input={inputHandler}
    />
  {:else}
    <input
      type={props.type}
      name={props.name}
      id={props.label}
      required={props.required}
      {value}
      on:input={inputHandler}
    />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  input,
  textarea {
    border: 1px solid lightgrey;
    padding: 0.6rem;
  }

  textarea {
    resize: none;
    min-height: 30ch;
  }
</style>
