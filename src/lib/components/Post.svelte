<script lang="ts">
  export let post: PostWithAuthor;
</script>

<article>
  <h4>{post.title}</h4>
  <p>{post.content}</p>
  <div>
    <p>Posted by: {post.author.email}</p>
    <p>{new Date(post.createdAt).toLocaleDateString()}</p>
  </div>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.8rem;
    background-color: whitesmoke;
    padding: 1.6rem;
    border-radius: 0.6rem;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
