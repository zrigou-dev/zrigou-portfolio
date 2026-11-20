import { site } from "@/data/site";
import { localizePath } from "@/i18n/config";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export function personSchema(locale, t) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    jobTitle: t.meta.jobTitle,
    description: t.meta.description,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
    knowsLanguage: ["ar", "fr", "en"],
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Chrome extensions",
    ],
    sameAs: [site.linkedin, site.github],
  };
}

export function websiteSchema(locale, t) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: t.meta.description,
    inLanguage: locale,
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

export function profilePageSchema(locale, t) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}${localizePath(locale)}#profile`,
    url: `${site.url}${localizePath(locale)}`,
    name: t.meta.title,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

const applicationCategories = {
  clinoly: "HealthApplication",
  masroufi: "FinanceApplication",
  sakina: "LifestyleApplication",
  inspectra: "DeveloperApplication",
};

export function projectSchema(project, locale) {
  const path = localizePath(locale, `/projects/${project.id}`);
  const shared = {
    "@context": "https://schema.org",
    "@id": `${site.url}${path}#project`,
    name: project.title,
    url: project.url ?? `${site.url}${path}`,
    description: project.description,
    inLanguage: locale,
    image: `${site.url}${project.image}`,
    author: { "@id": personId },
  };

  if (!project.flagship) {
    return { ...shared, "@type": "CreativeWork", url: `${site.url}${path}`, sameAs: project.url, about: project.category };
  }
  return {
    ...shared,
    "@type": "SoftwareApplication",
    applicationCategory: applicationCategories[project.id],
    operatingSystem: project.platform,
    sameAs: project.repo,
    ...(project.download && { downloadUrl: `${site.url}${project.download.url}` }),
  };
}
