import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";
import { useDemo } from "@/components/passport/demo-provider";
import { initialState } from "@/lib/passport-data";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Your story. Your control. | RefugeeSkills Passport" },
      {
        name: "description",
        content: "A transparent, consent-first approach to your professional information.",
      },
      { property: "og:title", content: "Your story. Your control. | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "A transparent, consent-first approach to your professional information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Content,
});
function Content() {
  const { update } = useDemo();
  return (
    <Page
      title="Your story. Your control."
      description="A transparent, consent-first approach to your professional information."
      narrow
    >
      <div className="info-content">
        <h2>What this demo stores</h2>
        <p>
          Your profile, project details, self-assessment submissions and demo mentor requests are
          saved locally in this browser. They are not uploaded to a profile service. Evidence
          uploads store only a filename, not file contents.
        </p>
        <h2>No public profiles</h2>
        <p>
          Your passport preview is private to your device. Opening its address on another device
          does not reveal your profile. The dashboard can copy a summary you choose to share, but
          excludes contact details and does not create a public link.
        </p>
        <h2>Contact requires consent</h2>
        <p>
          Demo employers can request contact only where a fictional candidate has permitted it. No
          contact information is shown and no messages are sent. Profile contact preferences do not
          automatically publish anything.
        </p>
        <h2>Protect your information</h2>
        <p>
          Anyone using the same browser may see saved demo data. Avoid entering sensitive legal,
          identity or contact information, especially on shared devices. You can clear your demo
          data using the button below.
        </p>
        <h2>Third-party services</h2>
        <p>
          The website loads fonts and a photograph from external hosting services. Opening your own
          project links may take you to third-party sites with separate privacy practices.
        </p>
        <Notice>
          This describes the current prototype only. A live service would require a full privacy
          policy, secure accounts, explicit sharing permissions and data management controls.
        </Notice>
        <Button
          variant="destructive"
          onClick={() => {
            if (
              window.confirm(
                "Clear your saved profile, projects, assessments and requests from this browser?",
              )
            ) {
              update(initialState);
              toast.success("Saved demo data cleared.");
            }
          }}
        >
          Clear saved demo data
        </Button>
      </div>
    </Page>
  );
}
