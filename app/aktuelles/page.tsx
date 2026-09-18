import type { Metadata } from "next";
import { News } from "@/site/pages/News";
import { buildMetadata } from "@/site/config/seo";
import { getNewsContent } from "@/site/content";
import {
  BUSINESS_ID,
  breadcrumbJsonLd,
  germanDateToIso,
  graph,
  pageUrl,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { stripFocus } from "@/site/lib/image";

export const metadata: Metadata = buildMetadata("news");

export default async function Page() {
  const content = await getNewsContent();

  const newsList = {
    "@type": "ItemList",
    "@id": `${pageUrl("news")}#news`,
    name: "Aktuelles",
    numberOfItems: content.items.length,
    itemListElement: content.items.map((item, i) => {
      // Das Datum kommt als deutscher Fliesstext aus dem CMS. Laesst es sich
      // nicht sicher lesen, entfaellt das Feld – lieber keine als eine
      // falsche Angabe.
      const datePublished = germanDateToIso(item.date);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "BlogPosting",
          headline: item.title,
          description: item.excerpt,
          articleSection: item.category,
          inLanguage: "de-DE",
          ...(item.image ? { image: stripFocus(item.image) } : {}),
          ...(datePublished ? { datePublished } : {}),
          author: { "@id": BUSINESS_ID },
          publisher: { "@id": BUSINESS_ID },
          isPartOf: { "@id": `${pageUrl("news")}#webpage` },
        },
      };
    }),
  };

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbJsonLd("news"),
          webPageJsonLd("news", "CollectionPage"),
          newsList,
        ])}
      />
      <News content={content} />
    </>
  );
}
