import { ProductProps } from "@/app/[category]/[product]/page";
import ProductCard from "./ProductCard";

const Products = ({
  products,
  category,
}: {
  category: string;
  products: ProductProps[];
}) => {
  // const category = usePathname().slice(1);
  return (
    <section>
      {products.map((product, index) => {
        return (
          <ProductCard
            key={product.id}
            slug={product.slug}
            name={product.name}
            image={product.image} //get right url of image from root (/src/assets/)
            isNew={product.new}
            description={product.description}
            index={index}
            category={category}
          />
        );
      })}
    </section>
  );
};

export default Products;
