import type { Metadata } from "next";
import { siteConfig } from "./site";

type SocialMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function buildSocialMetadata(
  input: SocialMetadataInput,
): Pick<Metadata, "openGraph" | "twitter"> {
  const image = input.image
    ? {
        url: input.image,
        alt: input.imageAlt ?? input.title,
        width: input.imageWidth ?? 1376,
        height: input.imageHeight ?? 768,
      }
    : undefined;

  return {
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.path,
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: input.title,
      description: input.description,
      images: image ? [image.url] : undefined,
    },
  };
}
