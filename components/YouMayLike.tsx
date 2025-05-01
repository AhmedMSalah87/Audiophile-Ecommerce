import Link from "next/link";

import { Button } from "./ui/button";
import { ProductProps } from "@/app/[category]/[product]/page";

const YouMayLike = ({ product }: { product: ProductProps }) => {
  // Helper function to extract category from the slug
  const getCategoryFromSlug = (slug: string): string => {
    const slugParts = slug.split("-");
    return slugParts[slugParts.length - 1]; //  category is the last part of the slug
  };

  return (
    <div className="contain mx-auto mb-64 text-center w-[90%] lg:w-full">
      <h3 className="mb-16">YOU MAY ALSO LIKE</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {product.others?.map((item, index) => {
          const category = getCategoryFromSlug(item.slug);
          return (
            <div key={index}>
              <div>
                <img
                  src={item.image?.desktop}
                  alt={item.name}
                  width="100%"
                  className="mb-10 hidden lg:block rounded-md"
                />
                <img
                  src={item.image?.tablet}
                  alt={item.name}
                  width="100%"
                  className="mb-10 hidden md:block lg:hidden rounded-md"
                />
                <img
                  src={item.image?.mobile}
                  alt={item.name}
                  width="100%"
                  className="mb-10 md:hidden rounded-md"
                />
              </div>
              <h5 className="mb-8">{item.name}</h5>
              <Button asChild>
                <Link href={`/${category}/${item.slug}`}>SEE PRODUCT</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouMayLike;
