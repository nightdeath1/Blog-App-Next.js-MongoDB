import { Suspense } from "react";
import AddBlogClient from "./AddBlogClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-5 px-5 sm:pt-12 sm:pl-16">Loading...</div>}>
      <AddBlogClient />
    </Suspense>
  );
}