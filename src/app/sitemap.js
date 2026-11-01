import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: project.flagship ? 0.9 : 0.7,
    })),
    { url: `${site.url}/games`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
