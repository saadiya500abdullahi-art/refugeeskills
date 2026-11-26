import { describe, expect, it } from "vitest";
import { canRequestContact, assessmentLabel, candidates, opportunities } from "@/lib/passport-data";
describe("Passport demo safeguards", () => {
  it("prevents contact requests without candidate consent", () => {
    expect(canRequestContact(false)).toBe(false);
    expect(canRequestContact(true)).toBe(true);
  });
  it("labels completed assessments as self-assessed rather than certified", () => {
    expect(assessmentLabel(true)).toBe("Completed · Self-assessed");
  });
  it("never includes candidate personal contact details in employer demo data", () => {
    for (const c of candidates) {
      expect(c).not.toHaveProperty("email");
      expect(c).not.toHaveProperty("phone");
      expect(c).not.toHaveProperty("address");
    }
  });
  it("includes all six requested opportunity types", () => {
    expect(opportunities.map((o) => o.category)).toEqual([
      "Internship",
      "Fellowship",
      "Remote work",
      "Training",
      "Mentorship",
      "Entry-level job",
    ]);
  });
});
