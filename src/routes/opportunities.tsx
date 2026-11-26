import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { opportunities } from "@/lib/passport-data";
import { Page, Notice, OpportunityCard, Empty } from "@/components/passport/workspace";
export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunity Board | RefugeeSkills Passport" },
      {
        name: "description",
        content:
          "Explore sample internships, fellowships, jobs, training and mentorship opportunities by skill and category.",
      },
      { property: "og:title", content: "Opportunity Board | RefugeeSkills Passport" },
      {
        property: "og:description",
        content: "Explore pathways to your next professional chapter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Opportunities,
});
function Opportunities() {
  const [type, setType] = useState("All types");
  const [skill, setSkill] = useState("All skills");
  const [search, setSearch] = useState("");
  const filtered = opportunities.filter(
    (o) =>
      (type === "All types" || o.category === type) &&
      (skill === "All skills" || o.skill === skill) &&
      `${o.title} ${o.description} ${o.org}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Page
      title="Your next opportunity"
      eyebrow="Open doors. New possibilities."
      description="Explore pathways to meaningful work, professional growth and new connections."
    >
      <Notice>
        All opportunities and organizations below are fictional samples. They are not live job
        listings and applications are not sent.
      </Notice>
      <div className="filters">
        <label className="field">
          Search opportunities
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or keyword"
          />
        </label>
        <label className="field">
          Opportunity type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All types</option>
            {opportunities.map((o) => (
              <option key={o.id}>{o.category}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Skills
          <select value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option>All skills</option>
            {opportunities.map((o) => (
              <option key={o.id}>{o.skill}</option>
            ))}
          </select>
        </label>
        <span className="result-count" aria-live="polite">
          {filtered.length} sample opportunities
        </span>
      </div>
      {filtered.length ? (
        <div className="grid-three">
          {filtered.map((item) => (
            <OpportunityCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <Empty
          title="No matching samples"
          text="Try another skill, opportunity type or search term."
        />
      )}
    </Page>
  );
}
