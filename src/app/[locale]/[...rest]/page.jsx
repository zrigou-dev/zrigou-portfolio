import { notFound } from "next/navigation";

// Any path that matches no page ends up here, so it renders the styled 404 inside the locale layout.
export default function CatchAll() {
  notFound();
}
