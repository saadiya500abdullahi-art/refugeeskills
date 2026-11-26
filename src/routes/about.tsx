import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Talent has no borders | RefugeeSkills Passport" },
      {
        name: "description",
        content: "Unlocking Displaced Talent: Pathways for Skilled Refugees.",
      },
      { property: "og:title", content: "Talent has no borders | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Unlocking Displaced Talent: Pathways for Skilled Refugees.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Content,
});
function Content() {
  return (
    <Page
      title="Talent has no borders"
      description="Unlocking Displaced Talent: Pathways for Skilled Refugees."
      narrow
    >
      <div className="info-content">
        <h2>A more complete picture of professional potential</h2>
        <p>
          RefugeeSkills Passport helps skilled refugees and displaced professionals make their
          abilities, practical experience and projects visible, even when qualifications are
          missing, foreign or difficult to recognize.
        </p>
        <h2>Built on dignity, not assumptions</h2>
        <p>
          People bring skills, knowledge, initiative and professional experience across borders. Our
          aim is to create fairer pathways to meaningful work through evidence, professional
          mentorship and access to guidance.
        </p>
        <h2>Opportunity through partnership</h2>
        <p>
          Candidates, employers, mentors and training organizations all have a role to play. This
          project aligns with SDGs 4, 8, 10 and 17: quality education, decent work, reduced
          inequalities and partnerships.
        </p>
        <Notice>
          This is a mini-hackathon prototype, not an employment agency or credential issuing
          authority. All sample people, organizations and testimonials are fictional.
        </Notice>
      </div>
    </Page>
  );
}
