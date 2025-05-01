import headphones from "@/public/shared/desktop/image-category-thumbnail-headphones.png";
import speakers from "@/public/shared/desktop/image-category-thumbnail-speakers.png";
import earphones from "@/public/shared/desktop/image-category-thumbnail-earphones.png";
import arrowIcon from "@/public/shared/desktop/icon-arrow-right.svg";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Categories = ({ className }: { className?: string }) => {
  return (
    <section className={cn("contain mx-auto mb-42", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-0 justify-items-center w-full">
        <div className="relative max-w-[90%] text-center pt-28 bg-secondary w-full">
          <Image src={headphones} alt="" className="img-catg" />
          <h6 className="mb-4">HEADPHONES</h6>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Link
              href="/headphones"
              className="uppercase text-muted-foreground font-bold hover:text-primary"
            >
              shop
            </Link>
            <Image src={arrowIcon} alt="" />
          </div>
        </div>
        <div className="relative max-w-[90%]  text-center pt-28 bg-secondary w-full">
          <Image src={speakers} alt="" className="img-catg" />
          <h6 className="mb-4">SPEAKERS</h6>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Link
              href="/speakers"
              className="uppercase text-muted-foreground font-bold hover:text-primary"
            >
              shop
            </Link>
            <Image src={arrowIcon} alt="" />
          </div>
        </div>
        <div className="relative max-w-[90%] text-center pt-28 bg-secondary w-full">
          <Image src={earphones} alt="" className="img-catg" />
          <h6 className="mb-4">EARPHONES</h6>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Link
              href="/earphones"
              className="uppercase text-muted-foreground font-bold hover:text-primary"
            >
              shop
            </Link>
            <Image src={arrowIcon} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
