import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Page, Notice } from "@/components/passport/workspace";

export const Route = createFileRoute("/credentials")({
  head: () => ({
    meta: [
      { title: "A pathway for your qualifications | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "General guidance to help you explore recognition, assessment and professional development.",
      },
      {
        property: "og:title",
        content: "A pathway for your qualifications | RefugeeSkills Passport",
      },
      {
        property: "og:description",
        content:
          "General guidance to help you explore recognition, assessment and professional development.",
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
      title="A pathway for your qualifications"
      description="General guidance to help you explore recognition, assessment and professional development."
      narrow
    >
      <div className="info-content">
        <Notice>
          Requirements depend on your country, profession, residency status and legal circumstances.
          This is general information, not legal advice or a guarantee of recognition, certification
          or employment.
        </Notice>
        <h2>1. Identify the relevant authority</h2>
        <p>
          Check whether your profession is regulated in your country of residence. A professional
          regulator, education ministry or national recognition body can explain the required steps.
        </p>
        <Button
          variant="link"
          className="px-0"
          onClick={() =>
            toast.info(
              "Authority link placeholder: consult your national qualification recognition body or professional regulator.",
            )
          }
        >
          National recognition authority (placeholder) <ArrowRight />
        </Button>
        <h2>2. Gather evidence of your experience</h2>
        <p>
          Collect available qualifications, transcripts, translated documents, work references and
          examples of practical work. Ask the authority about alternative evidence if documents are
          unavailable. Do not assume a portfolio alone satisfies legal requirements.
        </p>
        <h2>3. Explore skills assessment</h2>
        <p>
          Some professions offer practical assessment, interviews or recognition of prior learning.
          Confirm eligibility, accepted evidence, fees and appeal options with the relevant
          authority.
        </p>
        <h2>4. Consider bridging courses</h2>
        <p>
          Language programs, supervised practice and bridging courses can help address gaps between
          your experience and local professional requirements. Look for accredited providers and ask
          about financial support.
        </p>
        <Button
          variant="link"
          className="px-0"
          onClick={() =>
            toast.info(
              "Training provider link placeholder: check accredited local bridging course and language providers.",
            )
          }
        >
          Accredited course provider (placeholder) <ArrowRight />
        </Button>
        <h2>5. Plan for professional certification</h2>
        <p>
          Review prerequisites, examinations, supervised practice and renewal obligations before
          committing to a certification pathway. Verify that the credential is recognized in your
          intended role and location.
        </p>
        <Button
          variant="link"
          className="px-0"
          onClick={() =>
            toast.info(
              "Professional regulator link placeholder: consult the official regulator for your profession and country.",
            )
          }
        >
          Professional certification body (placeholder) <ArrowRight />
        </Button>
        <h2>Take your next step with support</h2>
        <p>
          A mentor or local refugee-led professional organization may help you identify reliable
          guidance and prepare questions for the relevant authority.
        </p>
        <Button asChild variant="outline">
          <Link to="/mentorship">
            Explore mentorship <ArrowRight />
          </Link>
        </Button>
      </div>
    </Page>
  );
}
