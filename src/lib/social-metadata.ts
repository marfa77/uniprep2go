import type { Metadata } from "next";
import { finalize } from "./seo";
import { absoluteUrl } from "./site";

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
  const imageUrl = input.image
    ? input.image.startsWith("http")
      ? input.image
      : absoluteUrl(input.image)
    : undefined;
  const image = imageUrl
    ? {
        url: imageUrl,
        alt: input.imageAlt ?? input.title,
        width: input.imageWidth ?? 1376,
        height: input.imageHeight ?? 768,
      }
    : undefined;

  return finalize({
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.path,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: input.title,
      description: input.description,
      images: image ? [image.url] : undefined,
    },
  });
}
