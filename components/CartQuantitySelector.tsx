"use client";

import { useAppDispatch } from "@/hooks/hooks";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  CartItem,
} from "@/cartSlice";

const CartQuantitySelector = ({ product }: { product: CartItem }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-secondary inline-flex items-center gap-3 px-3 py-1.5">
      <svg
        className="h-4 fill-muted-foreground cursor-pointer"
        onClick={() => dispatch(decreaseItemQuantity(product.id))}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M432 256c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32h352c17.7 0 32 14.3 32 32z" />
      </svg>
      <p>{product.quantity}</p>
      <svg
        className="h-4 fill-muted-foreground cursor-pointer"
        onClick={() => dispatch(increaseItemQuantity(product.id))}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    </div>
  );
};

export default CartQuantitySelector;
