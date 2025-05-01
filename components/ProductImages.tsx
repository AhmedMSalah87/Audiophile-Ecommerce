import { ProductProps } from "@/app/[category]/[product]/page";

const ProductImages = ({ product }: { product: ProductProps }) => {
  return (
    <div className="contain mx-auto mb-40 ">
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-8 w-[90%] lg:w-full mx-auto">
        <div className="flex flex-col gap-4 lg:gap-8">
          <div>
            <img
              src={product.gallery?.first.desktop}
              alt={product.name}
              className="rounded-md hidden lg:block"
            />
            <img
              src={product.gallery?.first.tablet}
              alt={product.name}
              className="rounded-md hidden md:block lg:hidden w-full"
            />
            <img
              src={product.gallery?.first.mobile}
              alt={product.name}
              className="rounded-md md:hidden w-full"
            />
          </div>
          <div>
            <img
              src={product.gallery?.second.desktop}
              alt={product.name}
              className="rounded-md hidden lg:block"
            />
            <img
              src={product.gallery?.second.tablet}
              alt={product.name}
              className="rounded-md hidden md:block lg:hidden w-full"
            />
            <img
              src={product.gallery?.second.mobile}
              alt={product.name}
              className="rounded-md md:hidden w-full"
            />
          </div>
        </div>
        <div>
          <img
            src={product.gallery?.third.desktop}
            alt={product.name}
            className="rounded-md hidden lg:block"
          />
          <img
            src={product.gallery?.third.tablet}
            alt={product.name}
            className="rounded-md hidden md:block lg:hidden w-full"
          />
          <img
            src={product.gallery?.third.mobile}
            alt={product.name}
            className="rounded-md md:hidden w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
