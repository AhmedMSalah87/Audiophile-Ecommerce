"use client";

import { Button } from "./ui/button";
import { addItems, CartItem } from "@/cartSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useState } from "react";
import ProductQuantitySelector from "./ProductQuantitySelector";
import { toast } from "sonner";

interface CartProduct extends CartItem {
  new: boolean;
  description: string;
}

const ProductCardDetails = ({ product }: { product: CartProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  // to dispatch action by adding product for example through add to cart button

  return (
    <section className="contain mx-auto mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 w-[90%] lg:w-full mx-auto">
        <div>
          <img
            src={product.image?.desktop}
            alt=""
            className="hidden lg:block rounded-md"
          />
          <img
            src={product.image?.tablet}
            alt=""
            className="hidden md:block lg:hidden rounded-md w-full"
          />
          <img
            src={product.image?.mobile}
            alt=""
            className="md:hidden rounded-md w-full"
          />
        </div>
        <div className="self-center">
          <p className="text-primary tracking-[10px] mb-4">
            {product.new ? "NEW PRODUCT" : ""}
          </p>
          <h2 className="mb-8">{product.name}</h2>
          <p className="mb-8 text-muted-foreground">{product.description}</p>
          <h6 className="mb-12">$ {product.price}</h6>
          <div className="flex items-center gap-4">
            <ProductQuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <Button
              size="lg"
              onClick={() => {
                dispatch(addItems({ ...product, quantity }));
                toast.success("Item has been sent to cart");
              }}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCardDetails;
