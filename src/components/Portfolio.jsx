import ClientWork from "@/components/ClientWork";
import FlagshipCard from "@/components/FlagshipCard";
import { flagshipProjects } from "@/data/projects";

export default function Portfolio() {
  return (
    <section id="work" className="py-24 md:py-36">
      <div className="shell">
        <div data-reveal className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="section-title">Products I own, from schema to screen.</h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-ink-soft lg:col-span-4">
            Three products I designed and built myself. Every screen below is from the real software, running on
            sample data.
          </p>
        </div>

        <div className="space-y-5 md:space-y-6">
          {flagshipProjects.map((project, index) => (
            <FlagshipCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div data-reveal className="mb-8 mt-24 md:mb-12 md:mt-36">
          <p className="eyebrow mb-4">Client & team projects</p>
          <h2 className="section-title">Platforms people rely on.</h2>
        </div>
        <ClientWork />
      </div>
    </section>
  );
}
