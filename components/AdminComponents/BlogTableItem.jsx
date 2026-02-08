import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  editBlog,
  mongoId,
}) => {
  const BlogDate = new Date(date);

  return (
    <tr className="bg-white border-b">
      {/* Author */}
      <th
        scope="row"
        className="hidden sm:flex items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          alt="author"
          width={40}
          height={40}
          src={authorImg ? authorImg : assets.profile_icon}
        />
        <p>{author || "No author"}</p>
      </th>

      {/* Blog title */}
      <td className="px-6 py-4">{title || "No title"}</td>

      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap">{BlogDate.toDateString()}</td>

      {/* ACTIONS — SAME ROW */}
      <td className="px-6 py-4">
        <div className="flex gap-4 items-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => editBlog(mongoId)}
          >
            Edit
          </button>

          <button
            className="text-red-600 hover:underline"
            onClick={() => deleteBlog(mongoId)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
