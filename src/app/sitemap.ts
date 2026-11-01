import { MetadataRoute } from "next";
import { getCategories, getCollections, getVideos } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mentrohub.com";

  const [videosData, categories, collections] = await Promise.all([
    getVideos({ limit: 100 }),
    getCategories(),
    getCollections(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  const videoPages: MetadataRoute.Sitemap = videosData.videos.map((v) => ({
    url: `${baseUrl}/watch/${v.id}`,
    lastModified: new Date(v.publishedAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const collectionPages: MetadataRoute.Sitemap = collections.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...videoPages, ...categoryPages, ...collectionPages];
}
