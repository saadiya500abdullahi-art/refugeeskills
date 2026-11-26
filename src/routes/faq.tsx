import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions | RefugeeSkills Passport" },
      { name: "description", content: "A few answers before your next step." },
      { property: "og:title", content: "Frequently asked questions | RefugeeSkills Passport" },
      { property: "og:description", content: "A few answers before your next step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Content,
});
function Content() {
  return (
    <Page
      title="Frequently asked questions"
      description="A few answers before your next step."
      narrow
    >
      <div className="info-content">
        {[
          [
            "Do I need certificates to build a profile?",
            "No. You can include practical experience, projects, informal learning and qualifications even if documents are missing. This does not replace any legally required professional recognition.",
          ],
          [
            "Are the opportunities real?",
            "No. Every opportunity and organization in this prototype is a fictional sample. Application buttons do not submit applications.",
          ],
          [
            "Are assessments officially certified?",
            "No. Challenges are self-assessments only. They are not independently reviewed and no official certification is awarded.",
          ],
          [
            "Can employers see my personal information?",
            "No. Employer exploration uses fictional candidates. Your own profile stays in your browser and contact details are never exposed.",
          ],
          [
            "Can I use the profile on another device?",
            "Not in this demo. Information stays in the browser where you saved it. The dashboard can copy a text summary for you to share yourself.",
          ],
          [
            "Does a mentor request book a real session?",
            "No. It records a demo request on your dashboard only. No mentor is contacted and no session is scheduled.",
          ],
        ].map(([q, a]) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}
