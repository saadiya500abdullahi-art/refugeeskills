import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Plus, FileText, ExternalLink, Trash2, Eye, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/passport/demo-provider";
import { Page, Notice, Empty } from "@/components/passport/workspace";
import type { Project } from "@/lib/passport-data";
export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Skills Portfolio | RefugeeSkills Passport" },
      {
        name: "description",
        content: "Showcase projects and practical evidence of your professional skills.",
      },
      { property: "og:title", content: "Skills Portfolio | RefugeeSkills Passport" },
      { property: "og:description", content: "Let your work tell your professional story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
const blank = { title: "", description: "", skills: "", link: "", date: "", evidence: "" };
function Portfolio() {
  const { state, update } = useDemo();
  const [adding, setAdding] = useState(false);
  const [project, setProject] = useState(blank);
  const save = (e: FormEvent) => {
    e.preventDefault();
    const value: Project = { ...project, id: crypto.randomUUID() };
    update({ projects: [...state.projects, value] });
    setProject(blank);
    setAdding(false);
    toast.success("Project added to your portfolio.");
  };
  return (
    <Page
      title="Your skills, in practice"
      description="A project, a piece of work, a problem you solved. Show the evidence behind your experience."
      actions={
        <Button onClick={() => setAdding(!adding)}>
          <Plus />
          {adding ? "Close project form" : "Add a project"}
        </Button>
      }
    >
      <Notice>
        Evidence uploads are demo placeholders. Only the filename is saved, not the document.
        Projects are self-reported, not independently verified.
      </Notice>
      {adding && (
        <form onSubmit={save} className="form-section">
          <h2>Add a portfolio project</h2>
          <div className="form-grid">
            {(
              [
                ["title", "Project title *"],
                ["skills", "Skills demonstrated *"],
                ["description", "Project description *"],
                ["link", "Project link (optional)"],
                ["date", "Date completed"],
              ] as const
            ).map(([key, label]) => (
              <label className={`field ${key === "description" ? "wide" : ""}`} key={key}>
                {label}
                {key === "description" ? (
                  <textarea
                    required
                    value={project[key]}
                    onChange={(e) => setProject({ ...project, [key]: e.target.value })}
                    placeholder="What did you build or achieve? What was your role?"
                  />
                ) : (
                  <input
                    required={key === "title" || key === "skills"}
                    type={key === "date" ? "date" : key === "link" ? "url" : "text"}
                    value={project[key]}
                    onChange={(e) => setProject({ ...project, [key]: e.target.value })}
                    placeholder={key === "link" ? "https://" : ""}
                  />
                )}
              </label>
            ))}
            <label className="field">
              Evidence or document (demo placeholder)
              <div className="upload-zone">
                <FileText size={20} />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.txt"
                  onChange={(e) =>
                    setProject({ ...project, evidence: e.target.files?.[0]?.name ?? "" })
                  }
                />
              </div>
            </label>
          </div>
          <div className="form-actions mt-5">
            <Button type="submit">Save project</Button>
            <Button variant="ghost" type="button" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
      {state.projects.length === 0 ? (
        <Empty
          title="Make your experience visible"
          text="Your first project is the start of a portfolio that speaks for itself."
        />
      ) : (
        <div className="grid-three">
          {state.projects.map((p) => (
            <article className="card-item" key={p.id}>
              <span className="icon-box">
                <FileText />
              </span>
              <span className="badge badge-neutral">Self-reported evidence</span>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <div className="badges mt-4">
                {p.skills.split(",").map((s) => (
                  <span className="badge" key={s}>
                    {s.trim()}
                  </span>
                ))}
              </div>
              <div className="card-meta">
                {p.date && (
                  <span>
                    <Calendar size={12} />
                    {p.date}
                  </span>
                )}
                {p.evidence && (
                  <span>
                    <FileText size={12} />
                    {p.evidence} · Filename only
                  </span>
                )}
              </div>
              <div className="card-bottom form-actions">
                {p.link && /^https?:\/\//i.test(p.link) && (
                  <Button asChild variant="outline">
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      View project <ExternalLink />
                    </a>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${p.title}`}
                  onClick={() => {
                    update({ projects: state.projects.filter((item) => item.id !== p.id) });
                    toast.success("Project removed.");
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="mt-section">
        <Button asChild variant="outline">
          <Link to="/passport">
            <Eye /> Preview your Skills Passport
          </Link>
        </Button>
      </div>
    </Page>
  );
}
