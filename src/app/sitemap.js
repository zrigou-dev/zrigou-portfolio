import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { localizePath, locales } from "@/i18n/config";

export default function sitemap() {
  const lastModified = new Date();
  const pages = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      path: `/projects/${project.id}`,
      changeFrequency: "monthly",
      priority: project.flagship ? 0.9 : 0.7,
    })),
    { path: "/games", changeFrequency: "yearly", priority: 0.3 },
  ];

  // One entry per language, each pointing at its siblings so search engines serve the right one.
  return pages.flatMap(({ path, ...rest }) => {
    const languages = Object.fromEntries(locales.map((code) => [code, `${site.url}${localizePath(code, path)}`]));
    return locales.map((locale) => ({
      url: languages[locale],
      lastModified,
      ...rest,
      alternates: { languages },
    }));
  });
}
