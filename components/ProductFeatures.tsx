import { ProductProps } from "@/app/[category]/[product]/page";
import { ProductDescription } from "@/services";
const ProductFeatures = ({ product }: { product: ProductProps }) => {
  const { firstParagraph, secondParagraph } = ProductDescription(
    product.features
  );
  return (
    <section className="contain mx-auto  mb-40">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-32 w-[90%] lg:w-full mx-auto">
        <div>
          <h3 className="mb-8">FEATURES</h3>
          <p className="text-muted-foreground mb-6">{firstParagraph}</p>
          <p className="text-muted-foreground">{secondParagraph}</p>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col">
          <h3 className="mb-8 flex-1">IN THE BOX</h3>
          <ul className="flex-1">
            {product.includes?.map((item, index) => (
              <li key={index} className="flex gap-6 space-y-2">
                <p className="text-primary font-bold">{item.quantity}x</p>
                <p className="text-muted-foreground">{item.item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
