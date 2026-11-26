import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const links = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/mentorship", label: "Mentorship" },
  { to: "/employers", label: "For employers" },
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="RefugeeSkills Passport home">
          <span className="brand-icon">
            <BookOpen size={23} />
          </span>
          <span>
            RefugeeSkills<span className="brand-sub">PASSPORT</span>
          </span>
        </Link>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "nav-active" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">My dashboard</Link>
          </Button>
          <Button asChild className="header-start">
            <Link to="/profile">
              Get started <ArrowUpRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {path !== "/" && (
        <div className="workspace-nav">
          <div className="container">
            {(
              [
                { to: "/dashboard", label: "Dashboard" },
                { to: "/profile", label: "Profile builder" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/assessments", label: "Assessments" },
                { to: "/credentials", label: "Credential guidance" },
              ] as const
            ).map((l) => (
              <Link key={l.to} to={l.to} activeProps={{ className: "nav-active" }}>
                {l.label}
              </Link>
            ))}
            <span className="demo-mark">DEMO WORKSPACE</span>
          </div>
        </div>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link to="/" className="brand">
            <span className="brand-icon">
              <BookOpen size={20} />
            </span>
            <span>
              RefugeeSkills<span className="brand-sub">PASSPORT</span>
            </span>
          </Link>
          <p>Talent has no borders. Opportunity shouldn’t either.</p>
        </div>
        <nav aria-label="Footer navigation">
          {(
            [
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy", label: "Privacy" },
              { to: "/faq", label: "FAQ" },
            ] as const
          ).map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} RefugeeSkills Passport</span>
        <span>Built for dignity. Designed for possibility.</span>
        <span>Hackathon prototype · Fictional demo data</span>
      </div>
    </footer>
  );
}
