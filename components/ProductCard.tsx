import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { ProductProps } from "@/app/[category]/[product]/page";

type ProductCardProps = Omit<ProductProps, "new"> & {
  index: number;
  isNew?: boolean; // optional as not all products new
};

const ProductCard = ({
  category,
  name,
  description,
  image,
  isNew,
  index,
  slug,
}: ProductCardProps) => {
  return (
    <div className="contain mx-auto">
      <div className="w-[90%] mx-auto">
        <div
          className={cn(
            // check for every product order that every other has reversed row to apply z pattern
            "contain mx-auto flex gap-32 my-40 flex-col lg:flex-row",
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          )}
        >
          <div className="flex-1 bg-secondary flex items-center justify-center">
            <img src={image?.desktop} alt={name} className="hidden lg:block" />
            <img
              src={image?.tablet}
              alt={name}
              className="hidden md:block lg:hidden"
            />
            <img src={image?.mobile} alt={name} className="block md:hidden" />
          </div>
          <div className="self-center flex-1 text-center lg:text-left">
            <p className="text-primary tracking-[10px] mb-4">
              {isNew ? "NEW PRODUCT" : ""}
            </p>
            <h2 className="mb-8">{name}</h2>
            <p className="text-muted-foreground mb-10">{description}</p>
            <Button
              asChild
              // i pass product slug from parent component in category page and only need category from useparams function
            >
              <Link href={`/${category}/${slug}`}>SEE PRODUCT</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
