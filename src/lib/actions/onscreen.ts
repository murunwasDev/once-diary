import { createEventDispatcher } from "svelte";

export const onscreen = (node: HTMLElement, params: { rootMargin: string }) => {
  const dispatch = createEventDispatcher();

  const observer = new IntersectionObserver(([node]) => {
    if (node.isIntersecting) dispatch("intersecting");
  });

  if (node) {
    observer.observe(node);
  }

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
};
