import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const ORIGIN = "https://nearandfarweddings.com";

function head() {
  return Route.options.head({ loaderData: { origin: ORIGIN } } as never);
}

describe("Search listing metadata", () => {
  it("tells search engines the business name", () => {
    const { scripts = [] } = head() as { scripts?: { type: string; children: string }[] };
    const ld = scripts.find((s) => s.type === "application/ld+json");

    expect(ld).toBeDefined();
    const graph = JSON.parse(ld!.children)["@graph"];
    const org = graph.find((n: { "@type": string }) => n["@type"] === "Organization");
    const site = graph.find((n: { "@type": string }) => n["@type"] === "WebSite");

    expect(org.name).toBe("Near & Far Weddings");
    expect(org.url).toBe(`${ORIGIN}/`);
    expect(org.logo).toBe(`${ORIGIN}/near-and-far-logo.png`);
    expect(site.name).toBe("Near & Far Weddings");
    expect(site.publisher["@id"]).toBe(`${ORIGIN}/#organization`);
  });

  it("keeps the share site name on the same spelling as the business name", () => {
    const meta = (head() as { meta: Record<string, string>[] }).meta;
    const siteName = meta.find((m) => m.property === "og:site_name");

    expect(siteName?.content).toBe("Near & Far Weddings");
  });
});
