import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Info, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { opportunities } from "@/lib/passport-data";
export function Page({
  title,
  eyebrow = "Your skills. Your next chapter.",
  description,
  actions,
  children,
  narrow = false,
}: {
  title: string;
  eyebrow?: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <main className={`container workspace ${narrow ? "info-content" : ""}`}>
      <div className="page-heading">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </main>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice">
      <Info size={17} />
      <span>{children}</span>
    </div>
  );
}
export function OpportunityCard({ item }: { item: (typeof opportunities)[number] }) {
  return (
    <article className="card-item">
      <div className="badges">
        <span className="badge">{item.category}</span>
        <span className="badge badge-neutral">Sample</span>
      </div>
      <h2>{item.title}</h2>
      <p>{item.org} · Fictional organization</p>
      <div className="card-meta">
        <span>
          <MapPin size={13} />
          {item.location}
        </span>
        <span>
          <Clock size={13} />
          {item.duration}
        </span>
      </div>
      <p>{item.description}</p>
      <div className="card-bottom">
        <div className="badges mb-5">
          <span className="badge badge-neutral">{item.skill}</span>
          <span className="badge badge-neutral">{item.tag}</span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            toast.info(
              "This is a sample opportunity. Applications are not sent; a real application link will be added in a future release.",
            )
          }
        >
          View application <ArrowRight />
        </Button>
      </div>
    </article>
  );
}
export function Empty({
  title,
  text,
  to,
  action,
}: {
  title: string;
  text: string;
  to?: "/profile" | "/portfolio";
  action?: string;
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
      {to && (
        <Button asChild>
          <Link to={to}>
            {action} <ArrowRight />
          </Link>
        </Button>
      )}
    </div>
  );
}
