import { clientProjects, flagshipProjects, projects } from "@/data/projects";
import { services, skillGroups } from "@/data/site";
import frProjects from "@/i18n/content/projects.fr";
import frSite from "@/i18n/content/site.fr";

const projectOverlays = { fr: frProjects };
const siteOverlays = { fr: frSite };

function mergeList(base, overlay) {
  return base?.map((item, index) => ({ ...item, ...overlay?.[index] }));
}

function localizeProject(project, overlay) {
  if (!overlay) return project;
  const { gallery, heroShots, download, ...text } = overlay;
  return {
    ...project,
    ...text,
    ...(project.download && { download: { ...project.download, ...download } }),
    ...(project.gallery && { gallery: mergeList(project.gallery, gallery) }),
    ...(project.heroShots && { heroShots: mergeList(project.heroShots, heroShots) }),
  };
}

export function getProjects(locale) {
  const overlay = projectOverlays[locale];
  return projects.map((project) => localizeProject(project, overlay?.[project.id]));
}

export const getFlagshipProjects = (locale) => getProjects(locale).filter((project) => project.flagship);
export const getClientProjects = (locale) => getProjects(locale).filter((project) => !project.flagship);

/** Experience, services and skill groups, translated by position. */
export function getSiteContent(locale) {
  const overlay = siteOverlays[locale];
  if (!overlay) return { services, skillGroups };
  return {
    services: mergeList(services, overlay.services),
    skillGroups: mergeList(skillGroups, overlay.skillGroups),
  };
}

export { clientProjects, flagshipProjects, projects };
