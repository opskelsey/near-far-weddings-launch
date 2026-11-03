import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const ORIGIN = "https://nearandfarweddings.com";

type HeadOutput = {
  meta?: { property?: string; content?: string; name?: string }[];
  scripts?: { type?: string; children?: string }[];
};

function head(): HeadOutput {
  const headFn = Route.options.head;
  if (!headFn) throw new Error("the homepage route must define head()");
  return headFn({ loaderData: { origin: ORIGIN } } as never) as unknown as HeadOutput;
}

describe("Search listing metadata", () => {
  it("tells search engines the business name", () => {
    const ld = head().scripts?.find((s) => s.type === "application/ld+json");

    expect(ld?.children).toBeDefined();
    const graph = JSON.parse(ld!.children!)["@graph"] as {
      "@type": string;
      name?: string;
      url?: string;
      logo?: string;
      publisher?: { "@id": string };
    }[];
    const org = graph.find((n) => n["@type"] === "Organization");
    const site = graph.find((n) => n["@type"] === "WebSite");

    expect(org?.name).toBe("Near & Far Weddings");
    expect(org?.url).toBe(`${ORIGIN}/`);
    expect(org?.logo).toBe(`${ORIGIN}/near-and-far-logo.png`);
    expect(site?.name).toBe("Near & Far Weddings");
    expect(site?.publisher?.["@id"]).toBe(`${ORIGIN}/#organization`);
  });

  it("keeps the share site name on the same spelling as the business name", () => {
    const siteName = head().meta?.find((m) => m["property"] === "og:site_name");

    expect(siteName?.["content"]).toBe("Near & Far Weddings");
  });
});
