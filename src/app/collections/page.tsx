import React from "react";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import CollectionCard from "@/components/cards/CollectionCard";
import { getCollections } from "@/lib/db";
import { Layers, Sparkles } from "lucide-react";

export const revalidate = 60;

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <HomepageLayout>
      <Container className="py-8 sm:py-10 space-y-8">
        <div className="border-b border-[#1f1f26] pb-6 space-y-2">
          <div className="flex items-center space-x-2 text-[#ff9900] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Structured Learning Tracks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white flex items-center">
            <Layers className="mr-3 text-[#ff9900]" />
            Educational Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
            Carefully sequenced, multi-lesson curricula designed to take you from
            curious beginner to proficient practitioner in Python, full-stack dev,
            mathematics, and machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </Container>
    </HomepageLayout>
  );
}
