"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackLink = () => {
  const router = useRouter();
  return (
    <div className="contain mx-auto mb-14 mt-18">
      <div className="w-[90%] mx-auto lg:w-full">
        <Button
          className="capitalize px-0"
          variant="link"
          onClick={() => router.back()}
        >
          go back
        </Button>
      </div>
    </div>
  );
};

export default BackLink;
