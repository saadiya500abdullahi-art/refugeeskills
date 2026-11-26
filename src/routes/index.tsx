import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Globe2,
  BriefcaseBusiness,
  Users,
  FileUser,
  Layers3,
  Sprout,
  GraduationCap,
  HeartHandshake,
  CirclePlay,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/passport-professionals.png.asset.json";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RefugeeSkills Passport — Your Skills Deserve to Be Seen" },
      {
        name: "description",
        content:
          "Turn your skills, practical experience and projects into a professional passport. Explore mentorship and pathways to meaningful work.",
      },
      { property: "og:title", content: "RefugeeSkills Passport — Your Skills Deserve to Be Seen" },
      {
        property: "og:description",
        content: "Talent has no borders. Build a skills portfolio and explore new opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
function Home() {
  return (
    <main>
      <section className="hero">
        <img
          className="hero-photo"
          src={hero.url}
          alt="Skilled professionals confidently collaborating on a project in a bright workspace"
        />
        <div className="container hero-content">
          <span className="eyebrow">
            <Sprout size={14} /> Unlocking talent. Opening doors.
          </span>
          <h1>
            Your Skills
            <br />
            Deserve to <span>Be Seen.</span>
          </h1>
          <p className="hero-description">
            Turn your experience, skills and projects into a professional profile that opens doors
            to new opportunities.
          </p>
          <div className="hero-buttons">
            <Button asChild>
              <Link to="/profile">
                Create Your Skills Passport <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/how-it-works">
                <CirclePlay /> Explore How It Works
              </Link>
            </Button>
          </div>
          <div className="hero-trust">
            <div className="avatar-stack">
              <span>LA</span>
              <span>YK</span>
              <span>NT</span>
              <span>AO</span>
            </div>
            <span>A place for your talent. A path to your next chapter.</span>
          </div>
        </div>
        <div className="floating-passport" aria-label="Fictional example skills passport">
          <span className="eyebrow">
            <FileUser size={12} /> Skills passport <span className="badge badge-neutral">DEMO</span>
          </span>
          <div className="profile-mini">
            <span className="mini-avatar">LA</span>
            <div>
              <strong>Leila Ahmed</strong>
              <p>UX / UI Designer</p>
            </div>
          </div>
          <div className="badges">
            <span className="badge">UX Design</span>
            <span className="badge">Figma</span>
            <span className="badge">Research</span>
          </div>
          <div className="mini-footer">
            <Check size={12} /> Experience backed by portfolio evidence
          </div>
        </div>
      </section>
      <section className="mission-strip">
        <div className="container mission-inner">
          <p>
            Built around people.
            <br />
            <strong>Powered by possibility.</strong>
          </p>
          <div className="mission-item">
            <Globe2 /> Talent without borders
          </div>
          <div className="mission-item">
            <ShieldCheck /> Your story, your control
          </div>
          <div className="mission-item">
            <BriefcaseBusiness /> Pathways to decent work
          </div>
          <div className="mission-item">
            <Users /> A community behind you
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">Your next chapter starts here</span>
          <h2>A world of skills. A passport to opportunity.</h2>
          <p>
            You bring the experience. We help you make it visible.
            <br />
            Build your professional story in three simple steps.
          </p>
        </div>
        <div className="steps-grid">
          {[
            {
              icon: FileUser,
              title: "Build your profile",
              text: "Tell your story, highlight your experience and bring your professional journey together.",
              to: "/profile",
              action: "Start your passport",
            },
            {
              icon: Layers3,
              title: "Showcase your skills",
              text: "Let your work speak for itself. Add projects and practical evidence of what you can do.",
              to: "/portfolio",
              action: "Explore portfolios",
            },
            {
              icon: HeartHandshake,
              title: "Connect with opportunities",
              text: "Find mentors, learning programs and opportunities that value your skills and potential.",
              to: "/opportunities",
              action: "Find your next step",
            },
          ].map((s, i) => (
            <div className="step-card" key={s.title}>
              <span className="step-number">0{i + 1}</span>
              <span className="icon-box">
                <s.icon size={23} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link to={s.to as "/profile" | "/portfolio" | "/opportunities"}>
                {s.action} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-soft">
        <div className="container problem-layout">
          <div>
            <span className="eyebrow">Experience shouldn’t get lost in translation</span>
            <h2>
              Your qualifications may cross borders.
              <br />
              Your talent always does.
            </h2>
            <p>
              Missing documents, unfamiliar qualifications and limited professional networks can
              hide years of valuable experience. A Skills Passport puts your abilities and practical
              work at the center of your story.
            </p>
            <Link className="text-link" to="/about">
              Why we’re building this <ArrowRight size={15} />
            </Link>
          </div>
          <div>
            <div className="feature">
              <h3>Evidence, not assumptions</h3>
              <p>Show the projects, experience and skills behind your professional potential.</p>
            </div>
            <div className="feature">
              <h3>Confidence in your next step</h3>
              <p>Connect with mentors and get guidance on qualification recognition.</p>
            </div>
            <div className="feature">
              <h3>You stay in control</h3>
              <p>
                Your profile is yours. Your personal contact details are never shared without
                permission.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">Opportunity is a shared effort</span>
          <h2>Different journeys. A common purpose.</h2>
        </div>
        <div className="grid-three">
          <div className="benefit">
            <FileUser size={28} />
            <h3>For skilled professionals</h3>
            <p>
              A place to showcase your abilities, strengthen your confidence and take your next
              career step.
            </p>
            <Button asChild variant="link" className="px-0">
              <Link to="/profile">
                Build your passport <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="benefit">
            <BriefcaseBusiness size={28} />
            <h3>For employers</h3>
            <p>
              Discover capable professionals through their skills and portfolio evidence, beyond
              familiar credentials.
            </p>
            <Button asChild variant="link" className="px-0">
              <Link to="/employers">
                Discover talent <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="benefit">
            <HeartHandshake size={28} />
            <h3>For mentors</h3>
            <p>
              Share your perspective, open your network and help talented people find their footing
              in a new market.
            </p>
            <Button asChild variant="link" className="px-0">
              <Link to="/mentorship">
                Meet the community <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Small steps. Meaningful impact.</span>
            <h2>Building pathways to a fairer future.</h2>
            <p>Our purpose aligns with the United Nations Sustainable Development Goals.</p>
          </div>
          <div className="sdg-row">
            {[
              ["4", "Quality Education", "Lifelong learning for everyone"],
              ["8", "Decent Work", "Skills that lead to opportunity"],
              ["10", "Reduced Inequalities", "Fairer access to employment"],
              ["17", "Partnerships", "Progress through collaboration"],
            ].map((s) => (
              <div className="sdg" key={s[0]}>
                <strong>{s[0]}</strong>
                <div>
                  <h3>{s[1]}</h3>
                  <p>{s[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">The possibilities behind every passport</span>
          <h2>Skills are just the beginning.</h2>
          <p>Illustrative stories · The following testimonials are fictional demo examples.</p>
        </div>
        <div className="grid-three">
          {[
            [
              "“My projects tell a story that a certificate alone couldn’t. I can finally show what I bring to a team.”",
              "Leila Ahmed",
              "UX / UI Designer",
            ],
            [
              "“Seeing practical work helps us focus on what a candidate can contribute, not where they started.”",
              "Alex Morgan",
              "Demo employer",
            ],
            [
              "“Sometimes the right conversation is the first step toward a completely new opportunity.”",
              "Amara Okafor",
              "Demo mentor",
            ],
          ].map((q) => (
            <div className="quote-card" key={q[1]}>
              <Sparkles className="text-primary" size={20} />
              <blockquote>{q[0]}</blockquote>
              <strong>{q[1]}</strong>
              <br />
              <small>{q[2]} · Fictional example</small>
            </div>
          ))}
        </div>
      </section>
      <section className="cta-band">
        <h2>Your next chapter starts with you.</h2>
        <p>Bring your skills, your experience and your ambition. Let’s make them visible.</p>
        <Button asChild size="lg">
          <Link to="/profile">
            Create Your Skills Passport <ArrowUpRight />
          </Link>
        </Button>
      </section>
    </main>
  );
}
