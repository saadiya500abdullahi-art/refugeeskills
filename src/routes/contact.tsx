import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Page, Notice } from "@/components/passport/workspace";
import { toast } from "sonner";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Share feedback on the RefugeeSkills Passport hackathon prototype through a demo contact form.",
      },
      { property: "og:title", content: "Contact | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Help shape fairer pathways to professional opportunity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});
function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Demo feedback complete. No message was sent or saved.");
    e.currentTarget.reset();
  };
  return (
    <Page
      title="Let’s build better pathways"
      description="A conversation about talent, inclusion and meaningful opportunity starts here."
      narrow
    >
      <Notice>
        This is a demo contact form. It does not send or save your message. No live contact address
        has been provided.
      </Notice>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label className="field">
            Your name
            <input required name="name" placeholder="Full name" />
          </label>
          <label className="field">
            Email address
            <input required type="email" name="email" placeholder="you@example.com" />
          </label>
          <label className="field wide">
            Your message
            <textarea required name="message" placeholder="What would you like to share?" />
          </label>
        </div>
        <Button type="submit" className="mt-5">
          <Send /> Submit demo feedback
        </Button>
        {sent && (
          <p role="status" className="mt-5 text-primary">
            Demo submission complete. No message was sent.
          </p>
        )}
      </form>
    </Page>
  );
}
