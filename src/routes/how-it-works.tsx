import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How your Skills Passport works | RefugeeSkills Passport" },
      { name: "description", content: "A professional story built around what you can do." },
      { property: "og:title", content: "How your Skills Passport works | RefugeeSkills Passport" },
      { property: "og:description", content: "A professional story built around what you can do." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Content,
});
function Content() {
  return (
    <Page
      title="How your Skills Passport works"
      description="A professional story built around what you can do."
      narrow
    >
      <div className="info-content">
        <section>
          <h2>01 · Build your profile</h2>
          <p>
            Add your professional title, experience, qualifications, languages and ambitions. Formal
            documents are not required to tell your story.
          </p>
        </section>
        <section>
          <h2>02 · Showcase your skills</h2>
          <p>
            Add projects and practical examples. Reflect on your abilities through self-assessment
            challenges. These do not grant official certification or independent verification.
          </p>
        </section>
        <section>
          <h2>03 · Connect with opportunities</h2>
          <p>
            Explore mentorship and sample opportunities that align with your interests. Track your
            progress on your dashboard.
          </p>
        </section>
        <Notice>
          This prototype saves your profile only in this browser. Mentorship, jobs and contact
          requests are demonstrations, not live services.
        </Notice>
        <Button asChild>
          <Link to="/profile">
            Create Your Skills Passport <ArrowRight />
          </Link>
        </Button>
      </div>
    </Page>
  );
}
