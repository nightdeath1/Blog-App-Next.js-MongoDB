"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddProductClient() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const router = useRouter();

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Eugene Ti",
    authorImg: "/author_img.png",
  });

  useEffect(() => {
    if (blogId) {
      axios.get(`/api/blog?id=${blogId}`).then((res) => {
        const blog = res.data;
        setData({
          title: blog.title,
          description: blog.description,
          category: blog.category,
          author: blog.author,
          authorImg: blog.authorImg || "/author_img.png",
        });
        setImage(blog.image || false);
      });
    }
  }, [blogId]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);

    if (image instanceof File) formData.append("image", image);

    try {
      const response = blogId
        ? await axios.put(`/api/blog?id=${blogId}`, formData)
        : await axios.post("/api/blog", formData);

      if (response.data.success) {
        toast.success(response.data.msg);
        router.push("/admin/blogList");
        router.refresh();
        return;
      }

      toast.error("Error");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p className="text-xl">Upload thumbnail</p>

      <label htmlFor="image">
        <Image
          className="mt-4"
          src={
            image
              ? typeof image === "string"
                ? image
                : URL.createObjectURL(image)
              : assets.upload_area
          }
          width={140}
          height={70}
          alt="thumbnail"
        />
      </label>

      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
      />

      <p className="text-xl mt-4">Blog title</p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Type here"
        required
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Write content here"
        rows={6}
        required
      />

      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />

      <button className="mt-8 w-40 h-12 bg-black text-white" type="submit">
        {blogId ? "Update Blog" : "Add Blog"}
      </button>
    </form>
  );
}