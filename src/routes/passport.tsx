import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Pencil, ShieldCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/passport/demo-provider";
import { Page, Notice, Empty } from "@/components/passport/workspace";
export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Your Skills Passport | RefugeeSkills Passport" },
      {
        name: "description",
        content: "Preview your private professional profile, skills and portfolio evidence.",
      },
      { property: "og:title", content: "Your Skills Passport | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Your experience and practical skills in one professional profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Passport,
});
function Passport() {
  const { state } = useDemo();
  const p = state.profile;
  return (
    <Page
      title="Your Skills Passport"
      description="Your professional story, brought together."
      actions={
        <Button variant="outline" asChild>
          <Link to="/profile">
            <Pencil /> Edit profile
          </Link>
        </Button>
      }
    >
      <Notice>
        <Eye className="inline mr-2" size={14} />
        Private preview · This profile is only available in your browser, not through a public link.
      </Notice>
      {!p.name ? (
        <Empty
          title="Your story starts here"
          text="Save your name and professional experience to create your Skills Passport."
          to="/profile"
          action="Build your profile"
        />
      ) : (
        <article className="profile-page">
          <div className="profile-cover" />
          <div className="profile-identity">
            <span className="person-avatar">
              {p.name
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </span>
            <h1>{p.name}</h1>
            <p>
              {p.title} {p.region ? `· ${p.region}` : ""}{" "}
              {p.years ? `· ${p.years} years of experience` : ""}
            </p>
            <div className="badges">
              {p.skills.map((s) => (
                <span className="badge" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="profile-details">
            {[
              ["Professional summary", p.summary],
              ["Work experience", p.experience],
              ["Education & qualifications", p.education],
              ["Languages", p.languages],
              ["Career goals", p.goals],
            ].map(([title, text]) =>
              text ? (
                <section key={title}>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </section>
              ) : null,
            )}
            <section>
              <h2>Portfolio evidence</h2>
              {state.projects.length ? (
                state.projects.map((project) => (
                  <div className="list-row" key={project.id}>
                    <FileText size={22} />
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <p>{project.skills} · Self-reported evidence</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No portfolio projects added yet.</p>
              )}
            </section>
            <section>
              <h2>Skills assessments</h2>
              <p>
                {Object.keys(state.assessments).length} completed self-assessments. No independently
                verified skills or official certifications have been awarded.
              </p>
            </section>
            <Notice>
              <ShieldCheck className="inline mr-2" size={14} />
              {p.contact}. No personal contact details are exposed.
            </Notice>
          </div>
        </article>
      )}
    </Page>
  );
}
