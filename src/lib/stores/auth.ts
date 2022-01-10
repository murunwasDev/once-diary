import { writable } from "svelte/store";

export const auth = writable({
  loading: false,
  error: ""
});

export const login = async (email: string, password: string) => {
  auth.update(prev => ({ ...prev, loading: true }));
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const error = await res.text();

  if (res.ok) {
    auth.update(prev => ({ ...prev, loading: false }));
    location.replace("/");
  } else {
    auth.update(prev => ({ ...prev, error, loading: false }));
  }
};

export const register = async (email: string, password: string) => {
  auth.update(prev => ({ ...prev, loading: true }));
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const error = await res.text();

  if (res.ok) {
    auth.update(prev => ({ ...prev, loading: false }));
    location.replace("/");
  } else {
    auth.update(prev => ({ ...prev, error, loading: false }));
  }
};
