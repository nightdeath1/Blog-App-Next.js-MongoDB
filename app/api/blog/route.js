import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
const fs = require('fs');

// Connect to DB
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

// GET: Get all blogs or single blog
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// POST: Add new blog
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();
    let imgUrl = null;

    const image = formData.get("image");
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const path = `./public/${timestamp}_${image.name}`;
      await writeFile(path, buffer);
      imgUrl = `/${timestamp}_${image.name}`;
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");
    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ success: false, msg: "Error saving blog" });
  }
}

// DELETE: Remove blog
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  if (blog?.image) fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}

// PUT: Edit blog
export async function PUT(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    const formData = await request.formData();

    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImg: formData.get("authorImg"),
    };

    const image = formData.get("image");
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const timestamp = Date.now();
      const path = `./public/${timestamp}_${image.name}`;
      await writeFile(path, buffer);
      updatedData.image = `/${timestamp}_${image.name}`;
    }

    await BlogModel.findByIdAndUpdate(blogId, updatedData);
    return NextResponse.json({ success: true, msg: "Blog Updated" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, msg: "Error updating blog" });
  }
}