import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileUser,
  Layers3,
  ClipboardCheck,
  HeartHandshake,
  ArrowRight,
  Eye,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";
import { useDemo } from "@/components/passport/demo-provider";
import { completion, opportunities, mentors } from "@/lib/passport-data";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Track profile completion, portfolio evidence, self-assessments, mentor requests and recommended sample opportunities.",
      },
      { property: "og:title", content: "Your Dashboard | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Your progress and next professional steps in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
function Dashboard() {
  const { state } = useDemo();
  const p = state.profile;
  const recommended = opportunities.filter((o) =>
    p.skills.some(
      (s) =>
        o.skill.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(o.skill.toLowerCase()),
    ),
  );
  const shown = recommended.length ? recommended.slice(0, 3) : opportunities.slice(0, 3);
  const share = async () => {
    const content = `${p.name || "My Skills Passport"}\n${p.title}\n${p.summary}\nSkills: ${p.skills.join(", ")}\nProjects: ${state.projects.map((v) => v.title).join(", ")}\nSelf-reported profile. Contact details omitted.`;
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Profile summary copied. No contact details or public link included.");
    } catch {
      toast.error(
        "Clipboard unavailable. Open your profile preview to select and copy your summary.",
      );
    }
  };
  return (
    <Page
      title={p.name ? `Welcome back, ${p.name.split(" ")[0]}.` : "Your next chapter starts here."}
      description="Every skill, project and connection is a step forward. Here’s where you are today."
      actions={
        <div className="form-actions">
          <Button variant="outline" asChild>
            <Link to="/passport">
              <Eye /> View passport
            </Link>
          </Button>
          <Button onClick={share}>
            <Share2 /> Copy profile summary
          </Button>
        </div>
      }
    >
      <Notice>
        Demo workspace · Profile data and requests stay on this device. Recommendations below are
        fictional samples.
      </Notice>
      <div className="stats-grid">
        {[
          { icon: FileUser, value: `${completion(p)}%`, label: "Profile completion" },
          { icon: Layers3, value: state.projects.length, label: "Portfolio projects" },
          {
            icon: ClipboardCheck,
            value: `${Object.keys(state.assessments).length} / 3`,
            label: "Self-assessments completed",
          },
          {
            icon: HeartHandshake,
            value: state.mentorRequests.length,
            label: "Demo mentorship requests",
          },
        ].map((s) => (
          <div className="stat" key={s.label}>
            <s.icon size={23} />
            <strong>{s.value}</strong>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="dashboard-columns">
        <section>
          <div className="block-heading">
            <h2>Your professional profile</h2>
            <Link to="/profile">
              Edit profile <ArrowRight size={12} className="inline" />
            </Link>
          </div>
          <div className="progress-track">
            <progress value={completion(p)} max={100} />
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            {completion(p)}% complete · Add your professional information to strengthen your
            passport.
          </p>
          <h3 className="text-sm mb-3">Your skills ({p.skills.length})</h3>
          <div className="badges">
            {p.skills.length ? (
              p.skills.map((s) => (
                <span className="badge" key={s}>
                  {s}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No skills added yet.</span>
            )}
          </div>
          <div className="block-heading mt-section">
            <h2>Portfolio projects</h2>
            <Link to="/portfolio">
              Add project <ArrowRight size={12} className="inline" />
            </Link>
          </div>
          {state.projects.length ? (
            state.projects.map((project) => (
              <div className="list-row" key={project.id}>
                <Layers3 size={20} />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.skills}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Your practical work belongs here. Add your first project.
            </p>
          )}
          <div className="block-heading mt-section">
            <h2>Mentorship requests</h2>
            <Link to="/mentorship">Find a mentor</Link>
          </div>
          {state.mentorRequests.length ? (
            mentors
              .filter((m) => state.mentorRequests.includes(m.id))
              .map((m) => (
                <div className="list-row" key={m.id}>
                  <span className="mini-avatar">{m.initials}</span>
                  <div>
                    <h3>{m.name}</h3>
                    <p>{m.title} · Demo request saved, not sent</p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No demo requests yet. A new perspective could be your next step.
            </p>
          )}
        </section>
        <section>
          <div className="block-heading">
            <h2>{recommended.length ? "Matched to your skills" : "Explore your possibilities"}</h2>
            <Link to="/opportunities">View all</Link>
          </div>
          {shown.map((o) => (
            <Link className="list-row" to="/opportunities" key={o.id}>
              <div>
                <span className="badge badge-neutral mb-2">{o.category} · Sample</span>
                <h3>{o.title}</h3>
                <p>
                  {o.org} · {o.location}
                </p>
              </div>
              <ArrowRight size={18} />
            </Link>
          ))}
          <div className="profile-aside mt-section">
            <ClipboardCheck className="text-primary" />
            <h3>Make your skills more visible</h3>
            <p>
              Complete a practical self-assessment to reflect on your abilities. No official
              certification is awarded.
            </p>
            <Button asChild variant="link" className="px-0">
              <Link to="/assessments">
                Explore challenges <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Page>
  );
}
