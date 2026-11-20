import { SplitWords } from "@/components/Split";

export default function Skills({ t, groups }) {
  return (
    <section id="skills" className="border-t border-line section-y">
      <div className="shell grid gap-8 md:gap-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-3 md:mb-4">{t.skills.eyebrow}</p>
            <h2 data-words className="section-title"><SplitWords text={t.skills.title} /></h2>
          </div>
        </div>

        <dl data-stagger className="border-t border-line lg:col-span-8">
          {groups.map((group) => (
            <div key={group.title} className="grid gap-2.5 border-b border-line py-5 md:grid-cols-[11rem_1fr] md:gap-6 md:py-6">
              <dt>
                <p className="font-display text-lg font-semibold tracking-tight md:text-xl">{group.title}</p>
                <p className="mt-0.5 text-xs text-muted">{group.proof}</p>
              </dt>
              <dd className="flex flex-wrap gap-1.5 md:gap-2">
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
