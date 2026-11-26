import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Eye, X, FileText, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Page, Notice, Empty } from "@/components/passport/workspace";
import { candidates, canRequestContact } from "@/lib/passport-data";
export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "Discover Skilled Talent | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Explore fictional candidate profiles by professional skills and portfolio evidence with consent-first contact.",
      },
      { property: "og:title", content: "Discover Skilled Talent | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "See professional potential beyond familiar credentials.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Employers,
});
function Employers() {
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("All categories");
  const [selected, setSelected] = useState<(typeof candidates)[number] | null>(null);
  const [requests, setRequests] = useState<string[]>([]);
  const filtered = candidates.filter(
    (c) =>
      (category === "All categories" || c.category === category) &&
      c.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())),
  );
  return (
    <Page
      title="See the skills. Discover the potential."
      eyebrow="Talent beyond borders"
      description="Explore practical skills and portfolio evidence, not assumptions. Find professionals who bring a fresh perspective to your team."
    >
      <Notice>
        Fictional demo candidates only. Evidence is self-reported, not verified. Personal contact
        details are hidden and demo requests are not sent.
      </Notice>
      <div className="filters">
        <label className="field">
          Search by skill
          <input
            type="search"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g. React, Design, Python"
          />
        </label>
        <label className="field">
          Professional category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All categories</option>
            {candidates.map((c) => (
              <option key={c.id}>{c.category}</option>
            ))}
          </select>
        </label>
        <span className="result-count">{filtered.length} demo candidates</span>
      </div>
      {filtered.length ? (
        <div className="grid-three">
          {filtered.map((c) => (
            <article className="card-item" key={c.id}>
              <span className="person-avatar">{c.initials}</span>
              <h2>{c.name}</h2>
              <p>{c.title}</p>
              <span className="badge badge-neutral my-4">Fictional demo candidate</span>
              <p>{c.summary}</p>
              <div className="badges mt-4">
                {c.skills.map((s) => (
                  <span className="badge" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="card-bottom">
                <Button variant="outline" className="w-full" onClick={() => setSelected(c)}>
                  <Eye /> View portfolio
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <Empty
          title="No matching candidates"
          text="Try a different professional category or skill."
        />
      )}
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent>
          {selected && (
            <>
              <DialogTitle>
                {selected.name} · {selected.title}
              </DialogTitle>
              <DialogDescription>
                Fictional demo profile · Practical portfolio evidence
              </DialogDescription>
              <p className="text-sm text-muted-foreground">{selected.summary}</p>
              <div className="badges">
                {selected.skills.map((s) => (
                  <span className="badge" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="feature">
                <FileText className="text-primary" />
                <h3>{selected.project}</h3>
                <p>{selected.evidence}</p>
                <span className="badge badge-neutral mt-3">
                  Self-reported · Not independently verified
                </span>
              </div>
              <Notice>
                <ShieldCheck className="inline mr-2" size={14} />
                {selected.consent
                  ? "This demo candidate permits contact requests. Personal details remain hidden."
                  : "This demo candidate has not consented to contact. Requests are disabled."}
              </Notice>
              <Button
                disabled={!canRequestContact(selected.consent) || requests.includes(selected.id)}
                onClick={() => {
                  if (!canRequestContact(selected.consent)) return;
                  setRequests([...requests, selected.id]);
                  toast.success(
                    "Demo contact request recorded. No message sent or contact information disclosed.",
                  );
                }}
              >
                <Send />
                {requests.includes(selected.id)
                  ? "Demo request recorded"
                  : selected.consent
                    ? "Request contact (demo)"
                    : "Contact not permitted"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Page>
  );
}
