import { experience } from "@/data/site";

const STATEMENT =
  "I build software the way it should be used: fast, clear and dependable. Over more than five years I have shipped web and mobile products for international clients, and I care as much about the data model as the last pixel.";

export default function About() {
  const words = STATEMENT.split(" ");

  return (
    <section id="about" className="border-t border-line py-24 md:py-36">
      <div className="shell">
        <p className="eyebrow mb-8">About</p>
        <p className="statement font-display text-[clamp(1.9rem,5vw,4.5rem)] font-semibold leading-[1.12] tracking-[-0.015em]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="reveal-word" style={{ "--p": index / words.length }}>
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-12">
            <h3 className="eyebrow mb-4">Experience</h3>
            <ol className="border-t border-line">
              {experience.map((job) => (
                <li key={job.company} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <p className="font-mono text-sm text-muted">{job.period}</p>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight">{job.company}</p>
                    <p className="mt-0.5 text-sm text-muted">{job.role}</p>
                    <ul className="mt-3 max-w-3xl space-y-1.5 leading-relaxed text-ink-soft">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li className="grid gap-3 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <p className="font-mono text-sm text-muted">Founder</p>
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tight">Clinoly</p>
                  <p className="mt-0.5 text-sm text-muted">Founder & Lead Developer</p>
                  <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
                    Building a multi-tenant clinic management platform, from the product and the database to deployment.
                  </p>
                </div>
              </li>
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
