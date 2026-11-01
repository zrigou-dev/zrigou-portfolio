import { skillGroups } from "@/data/site";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 md:py-36">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">Skills</p>
            <h2 className="section-title">The toolbox, and where it is used.</h2>
          </div>
        </div>

        <dl className="border-t border-line lg:col-span-8">
          {skillGroups.map((group) => (
            <div key={group.title} data-reveal className="grid gap-3 border-b border-line py-6 md:grid-cols-[11rem_1fr] md:gap-6">
              <dt>
                <p className="font-display text-xl font-semibold tracking-tight">{group.title}</p>
                <p className="mt-1 text-xs text-muted">{group.proof}</p>
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag transition-colors hover:border-accent hover:text-accent">
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
