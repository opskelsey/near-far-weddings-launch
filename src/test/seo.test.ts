import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const ORIGIN = "https://nearandfarweddings.com";

type HeadOutput = {
  meta?: { property?: string; content?: string; name?: string; title?: string }[];
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

  it("uses the 1200 by 630 homepage photo for social link previews", () => {
    const meta = head().meta;
    const imageUrl = `${ORIGIN}/og-image.jpg`;

    expect(meta?.find((m) => m.property === "og:image")?.content).toBe(imageUrl);
    expect(meta?.find((m) => m.property === "og:image:width")?.content).toBe("1200");
    expect(meta?.find((m) => m.property === "og:image:height")?.content).toBe("630");
    expect(meta?.find((m) => m.name === "twitter:card")?.content).toBe("summary_large_image");
    expect(meta?.find((m) => m.name === "twitter:image")?.content).toBe(imageUrl);
  });

  it("uses the Phoenix wedding planner title for search and sharing", () => {
    const title = "Phoenix Wedding Planner & Month-Of Coordinator | Arizona & Beyond";
    const meta = head().meta;

    expect(meta?.find((m) => m.title)?.title).toBe(title);
    expect(meta?.find((m) => m.property === "og:title")?.content).toBe(title);
  });

  it("uses the Phoenix planning description for search and sharing", () => {
    const description = "Wedding planning & month-of coordination based in Phoenix, Arizona. An experienced planner who can take the weight off your shoulders.";
    const meta = head().meta;

    expect(meta?.find((m) => m.name === "description")?.content).toBe(description);
    expect(meta?.find((m) => m.property === "og:description")?.content).toBe(description);
  });

  it("lists every supplied local service area in the business schema", () => {
    const ld = head().scripts?.find((s) => s.type === "application/ld+json");
    const graph = JSON.parse(ld!.children!)["@graph"] as {
      "@type": string;
      areaServed?: string[];
    }[];
    const org = graph.find((n) => n["@type"] === "Organization");

    expect(org?.areaServed).toEqual([
      "Phoenix",
      "Scottsdale",
      "Tempe",
      "Gilbert",
      "Chandler",
      "Mesa",
      "Casa Grande",
      "Apache Junction",
      "Queen Creek",
      "San Tan Valley",
      "Arizona",
      "Worldwide",
    ]);
  });
});
