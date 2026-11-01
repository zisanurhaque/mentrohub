import { NextRequest, NextResponse } from "next/server";
import { createCategory, getCategories } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, slug, description, iconName, bannerImage } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const category = await createCategory({
      name,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      description: description || "",
      iconName: iconName || "Folder",
      bannerImage: bannerImage || "",
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
