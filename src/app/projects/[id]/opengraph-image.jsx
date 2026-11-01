import { projects } from "@/data/projects";
import { ogSize, projectOgImage } from "@/lib/og";

export const alt = "Project by Mohamed Zrigou";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function Image({ params }) {
  const { id } = await params;
  return projectOgImage(projects.find((project) => project.id === id));
}
