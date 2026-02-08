import { Suspense } from "react";
import AddProductClient from "./AddProductClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-5 px-5 sm:pt-12 sm:pl-16">Loading...</div>}>
      <AddProductClient />
    </Suspense>
  );
}