import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ClipboardCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";
import { useDemo } from "@/components/passport/demo-provider";
import { assessmentLabel } from "@/lib/passport-data";
export const Route = createFileRoute("/assessments")({
  head: () => ({
    meta: [
      { title: "Skills Self-Assessments | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Demonstrate abilities with practical self-assessment challenges. No official certification is awarded.",
      },
      { property: "og:title", content: "Skills Self-Assessments | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Reflect on your skills with practical professional challenges.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Assessments,
});
const challenges = [
  {
    id: "a1",
    category: "Project management",
    title: "Plan a community workshop",
    instructions:
      "Outline a plan for a one-day community workshop. Include objectives, a timeline, stakeholders, a budget approach and two risks with mitigation strategies.",
  },
  {
    id: "a2",
    category: "Web development",
    title: "Design an accessible sign-up form",
    instructions:
      "Describe or link to a sign-up form that supports keyboard navigation, clear labels and helpful error messages. Explain three accessibility decisions and how you would test them.",
  },
  {
    id: "a3",
    category: "Communication",
    title: "Explain a complex idea clearly",
    instructions:
      "Choose a topic from your field. Explain it to someone without specialist knowledge, then reflect on how you adapted the language and checked for understanding.",
  },
];
function Assessments() {
  const { state, update } = useDemo();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const submit = (e: FormEvent, id: string) => {
    e.preventDefault();
    const value = drafts[id]?.trim();
    if (!value) return;
    update({ assessments: { ...state.assessments, [id]: value } });
    toast.success(
      "Self-assessment completed. This is not verification or an official certification.",
    );
  };
  return (
    <Page
      title="Let your abilities speak"
      description="Take a practical challenge, reflect on your work and add another dimension to your professional story."
    >
      <Notice>
        These are self-assessments only. Submissions are not reviewed by an independent assessor and
        do not award verified skills or official certification.
      </Notice>
      <div className="grid-three">
        {challenges.map((c) => (
          <article className="card-item" key={c.id}>
            <span className="icon-box">
              <ClipboardCheck />
            </span>
            <span className="badge">{c.category}</span>
            <h2>{c.title}</h2>
            <p>{c.instructions}</p>
            <form className="assessment-form" onSubmit={(e) => submit(e, c.id)}>
              <label className="field">
                Your submission
                <textarea
                  required
                  value={drafts[c.id] ?? state.assessments[c.id] ?? ""}
                  onChange={(e) => setDrafts({ ...drafts, [c.id]: e.target.value })}
                  placeholder="Describe your solution, reflection, or paste a project link."
                />
              </label>
              <span className="badge badge-neutral mb-4">
                {assessmentLabel(Boolean(state.assessments[c.id]))}
              </span>
              <Button type="submit" className="w-full">
                <Check />
                {state.assessments[c.id] ? "Update self-assessment" : "Complete self-assessment"}
              </Button>
            </form>
          </article>
        ))}
      </div>
    </Page>
  );
}
