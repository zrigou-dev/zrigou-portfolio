import { projects } from "@/data/projects";
import { locales } from "@/i18n/config";
import { ogSize, projectOgImage } from "@/lib/og";

export const alt = "Project by Mohamed Zrigou";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, id: project.id })));
}

// Project cards use the English title and tagline for every locale: the share font has no Arabic glyphs.
export default async function Image({ params }) {
  const { id } = await params;
  return projectOgImage(projects.find((project) => project.id === id));
}
