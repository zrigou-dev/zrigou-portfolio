import { site } from "@/data/site";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    jobTitle: site.jobTitle,
    description: site.description,
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

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/#profile`,
    url: site.url,
    name: site.title,
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
  inspectra: "DeveloperApplication",
};

export function projectSchema(project) {
  const path = `/projects/${project.id}`;
  const shared = {
    "@context": "https://schema.org",
    "@id": `${site.url}${path}#project`,
    name: project.title,
    url: project.url ?? `${site.url}${path}`,
    description: project.description,
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
