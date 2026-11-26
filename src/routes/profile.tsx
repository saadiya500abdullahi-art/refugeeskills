import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Eye, Save, ShieldCheck, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/passport/demo-provider";
import { Page, Notice } from "@/components/passport/workspace";
import { completion, type Profile } from "@/lib/passport-data";
export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Build Your Profile | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Build a professional skills profile with your experience, qualifications, languages and career goals.",
      },
      { property: "og:title", content: "Build Your Profile | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Create a passport for your skills and professional experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfileBuilder,
});
function ProfileBuilder() {
  const { state, update, ready } = useDemo();
  const [profile, setProfile] = useState<Profile>(state.profile);
  const [skill, setSkill] = useState("");
  useEffect(() => {
    if (ready) setProfile(state.profile);
  }, [ready]);
  const field = (
    key: Exclude<keyof Profile, "skills">,
    label: string,
    placeholder: string,
    area = false,
    required = false,
  ) => (
    <label className={`field ${area ? "wide" : ""}`}>
      {label}
      {area ? (
        <textarea
          value={profile[key]}
          placeholder={placeholder}
          onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
          required={required}
        />
      ) : (
        <input
          value={profile[key]}
          placeholder={placeholder}
          onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
          required={required}
          type={key === "years" ? "number" : "text"}
          min={key === "years" ? 0 : undefined}
        />
      )}
    </label>
  );
  const addSkill = () => {
    const s = skill.trim();
    if (s && !profile.skills.some((v) => v.toLowerCase() === s.toLowerCase()))
      setProfile({ ...profile, skills: [...profile.skills, s] });
    setSkill("");
  };
  const save = (e: FormEvent) => {
    e.preventDefault();
    update({ profile });
    toast.success("Your Skills Passport has been saved on this device.");
  };
  return (
    <Page
      title="Build your Skills Passport"
      description="Your experience matters. Bring your professional story together, one step at a time."
      actions={
        <Button variant="outline" asChild>
          <Link to="/passport">
            <Eye /> Preview profile
          </Link>
        </Button>
      }
    >
      <Notice>
        This is a private demo. Your saved information stays in this browser; it is not published or
        shared.
      </Notice>
      <div className="form-layout">
        <form onSubmit={save}>
          <section className="form-section">
            <h2>01 · Your professional identity</h2>
            <div className="form-grid">
              {field("name", "Full name *", "e.g. Leila Ahmed", false, true)}
              {field("title", "Professional title *", "e.g. UX / UI Designer", false, true)}
              {field("region", "Country or region of residence (optional)", "e.g. Germany")}
              {field("years", "Years of experience", "e.g. 6")}
              {field(
                "summary",
                "Professional summary",
                "Tell us about your background, strengths and the value you bring.",
                true,
              )}
            </div>
          </section>
          <section className="form-section">
            <h2>02 · Skills & qualifications</h2>
            <label className="field">
              Your skills
              <div className="skill-entry">
                <input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g. Project management"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill} aria-label="Add skill">
                  <Plus /> Add
                </Button>
              </div>
            </label>
            <div className="badges mt-3 mb-5">
              {profile.skills.map((s) => (
                <span className="badge" key={s}>
                  {s}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5"
                    type="button"
                    aria-label={`Remove ${s}`}
                    onClick={() =>
                      setProfile({ ...profile, skills: profile.skills.filter((v) => v !== s) })
                    }
                  >
                    <X size={12} />
                  </Button>
                </span>
              ))}
            </div>
            <div className="form-grid">
              {field(
                "education",
                "Education & qualifications",
                "Include formal, informal or incomplete studies. Missing documents are okay.",
                true,
              )}
              {field(
                "languages",
                "Languages",
                "e.g. Arabic (native), English (fluent), German (B1)",
                true,
              )}
            </div>
          </section>
          <section className="form-section">
            <h2>03 · Experience & aspirations</h2>
            <div className="form-grid">
              {field(
                "experience",
                "Previous work experience",
                "Roles, organizations, responsibilities and achievements.",
                true,
              )}
              {field(
                "goals",
                "Career goals",
                "What kind of role or opportunity would you like to pursue?",
                true,
              )}
              <label className="field wide">
                Contact preferences
                <select
                  value={profile.contact}
                  onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
                >
                  <option>Do not share contact details</option>
                  <option>Open to employer contact requests</option>
                  <option>Open to mentor contact requests</option>
                </select>
              </label>
            </div>
          </section>
          <div className="form-actions">
            <Button type="submit">
              <Save /> Save profile
            </Button>
            <Button type="submit" variant="outline">
              Save before adding projects <ArrowRight />
            </Button>
            <Button asChild variant="link">
              <Link to="/portfolio">
                Add portfolio project <ArrowRight />
              </Link>
            </Button>
          </div>
        </form>
        <aside className="profile-aside">
          <ShieldCheck className="text-primary" size={28} />
          <h3>A profile that’s truly yours</h3>
          <p>
            No perfect CV required. Your practical skills, lived experience and career ambitions all
            belong here.
          </p>
          <div className="progress-track">
            <progress value={completion(profile)} max={100} />
          </div>
          <strong>{completion(profile)}% complete</strong>
          <h3>Your privacy comes first</h3>
          <p>
            Contact preferences signal your interests only. This demo never publishes your profile
            or sends contact requests.
          </p>
          <Button asChild variant="link" className="px-0">
            <Link to="/privacy">
              Read our privacy approach <ArrowRight />
            </Link>
          </Button>
        </aside>
      </div>
    </Page>
  );
}
