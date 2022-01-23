/// <reference types="@sveltejs/kit" />

// TYPES
type Post = import("@prisma/client").Post;
type PostWithAuthor = Post & { author: { email: string } };

// INTERFACES
interface ImportMetaEnv {
  VITE_TOKEN_SECRET: string;
}

interface UserSession {
  id: string;
  email: string;
}

interface AsyncStore<T> {
  data: APIResponse<T>;
  error: string;
  loading: boolean;
}

interface APIResponse<T> {
  info: {
    cursor?: string | null;
    hasNextPage?: boolean;
    count?: number;
  };
  results: T;
}

interface ButtonProps {
  variant: "primary" | "secondary";
  onClick?: () => void;
  link?: boolean;
  href?: string;
  type?: "submit" | "reset";
  disabled?: boolean;
}

interface IconProps {
  fill?: string;
  type: "book" | "tick" | "cross";
}

interface FormProps {
  action?: string;
  method?: string;
  onSubmit?: () => void;
  inputs: number;
}

interface ToastProps {
  variant: "success" | "error";
  messsage: string;
}

interface FieldProps {
  type: "email" | "password" | "number" | "text" | "date" | "textarea";
  label: string;
  required?: boolean;
  name?: string;
}
