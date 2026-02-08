import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <Link href={`/blogs/${id}`} className="block">
      <div className="w-[330px] sm:w-[300px] h-[520px] bg-white border border-black hover:shadow-custom flex flex-col">
        <div className="relative w-full h-[240px] border-b border-black overflow-hidden">
          <Image
            src={image}
            alt={title || "blog thumbnail"}
            fill
            className="object-cover"
          />
        </div>
        <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm w-fit">
          {category}
        </p>
        <div className="p-5 flex flex-col flex-1">
          <h5
            className="mb-2 text-lg font-medium tracking-tight text-gray-900 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h5>
          <p
            className="mb-3 text-sm tracking-tight text-gray-700 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
          <div className="mt-auto inline-flex items-center py-2 font-semibold text-center">
            Read more
            <Image src={assets.arrow} className="ml-2" alt="arrow" width={12} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
