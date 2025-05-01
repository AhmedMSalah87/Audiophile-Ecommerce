import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroContent = () => {
  return (
    <main className="contain mx-auto text-white pt-24 border-t border-t-[#979797] w-[90%] lg:w-full text-center lg:text-left">
      <div className="max-w-100 mx-auto lg:m-0">
        <p className="text-muted-foreground mb-6 tracking-[10px]">
          NEW PRODUCT
        </p>
        <h1 className="mb-6">XX99 Mark II Headphones</h1>
        <p className="mb-10">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Button asChild size="lg">
          <Link href="/headphones/xx99-mark-two-headphones">SEE PRODUCT</Link>
        </Button>
      </div>
    </main>
  );
};

export default HeroContent;
