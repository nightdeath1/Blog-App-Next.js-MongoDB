"use client";

import { assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import authorImg from "@/assets/profile-photo.jpg";

export default function Page({ params }) {
  const { id } = React.use(params);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async () => {
      try {
        const response = await axios.get("/api/blog", {
          params: { id },
        });
        setData(response.data);
      } catch (err) {
        console.error(err);
        setData(null);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!data) return null;

  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-custom">
            Get started <Image src={assets.arrow} alt="" />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>

          <Image
            className="mx-auto border border-white rounded-full"
            src={authorImg}
            width={60}
            height={60}
            alt=""
          />

          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt=""
        />

        <h1 className="my-8 text-[26px] font-semibold">Description:</h1>
        <p>{data.description}</p>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="facebook" />
            <Image src={assets.twitter_icon} width={50} alt="twitter" />
            <Image src={assets.googleplus_icon} width={50} alt="googleplus" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
