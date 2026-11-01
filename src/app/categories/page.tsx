import React from "react";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import CategoryCard from "@/components/cards/CategoryCard";
import { getCategories } from "@/lib/db";
import { FolderTree, Sparkles } from "lucide-react";

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <HomepageLayout>
      <Container className="py-10 space-y-8">
        <div className="border-b border-[#22222a] pb-6 space-y-2">
          <div className="flex items-center space-x-2 text-[#ff9900] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Discover Knowledge by Discipline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center">
            <FolderTree className="mr-3 text-[#ff9900]" />
            Educational Categories
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
            Browse through our curated disciplines. Every category features verified
            lectures, tutorials, and deep-dives from the world&apos;s greatest educators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} data={cat} />
          ))}
        </div>
      </Container>
    </HomepageLayout>
  );
}
