import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Page, Notice } from "@/components/passport/workspace";
import { mentors } from "@/lib/passport-data";
import { useDemo } from "@/components/passport/demo-provider";
export const Route = createFileRoute("/mentorship")({
  head: () => ({
    meta: [
      { title: "Meet Your Mentors | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Explore fictional mentor profiles and request a demo mentoring session for your career journey.",
      },
      { property: "og:title", content: "Meet Your Mentors | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "New perspectives, practical guidance and a community behind you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mentorship,
});
function Mentorship() {
  const { state, update } = useDemo();
  const [category, setCategory] = useState("All expertise");
  return (
    <Page
      title="A conversation can open a door"
      eyebrow="You don’t have to navigate alone"
      description="Connect with professional perspectives, practical guidance and a community that believes in your potential."
    >
      <Notice>
        These are fictional mentor profiles. Demo requests are saved to your dashboard on this
        device; no session is booked and no message is sent.
      </Notice>
      <div className="filters">
        <label className="field">
          Mentor expertise
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All expertise</option>
            {mentors.map((m) => (
              <option key={m.id}>{m.category}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid-three">
        {mentors
          .filter((m) => category === "All expertise" || m.category === category)
          .map((m, i) => {
            const requested = state.mentorRequests.includes(m.id);
            return (
              <article className="card-item" key={m.id}>
                <div className="mentor-top">
                  <span
                    className={`person-avatar ${i === 0 ? "avatar-design" : i === 1 ? "avatar-engineering" : ""}`}
                  >
                    {m.initials}
                  </span>
                  <div>
                    <h2>{m.name}</h2>
                    <p>{m.title}</p>
                  </div>
                </div>
                <span className="badge badge-neutral mt-5">Fictional demo mentor</span>
                <div className="card-meta">{m.years}</div>
                <p>{m.bio}</p>
                <h3>Mentorship topics</h3>
                <div className="badges">
                  {m.topics.map((t) => (
                    <span className="badge" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="card-bottom">
                  <Button
                    className="w-full"
                    variant={requested ? "secondary" : "default"}
                    disabled={requested}
                    onClick={() => {
                      update({ mentorRequests: [...state.mentorRequests, m.id] });
                      toast.success(
                        `Demo session request for ${m.name} saved. No message was sent.`,
                      );
                    }}
                  >
                    {requested ? <Check /> : <HeartHandshake />}
                    {requested ? "Demo request saved" : "Request a demo session"}
                    {!requested && <ArrowRight />}
                  </Button>
                  {requested && (
                    <Button
                      variant="link"
                      onClick={() => {
                        update({
                          mentorRequests: state.mentorRequests.filter((id) => id !== m.id),
                        });
                        toast.success("Demo request cancelled.");
                      }}
                    >
                      Cancel request
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
      </div>
    </Page>
  );
}
