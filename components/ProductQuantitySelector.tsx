"use client";

import { SetStateAction } from "react";

const ProductQuantitySelector = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}) => {
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1); // ensure logic executed only if quantity > 1 and when go 1 or beow it stop decreasing
  return (
    <div className="bg-secondary inline-flex items-center gap-4 px-6 h-10">
      <svg
        className="h-4 fill-muted-foreground cursor-pointer"
        onClick={handleDecrease}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M432 256c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32h352c17.7 0 32 14.3 32 32z" />
      </svg>
      <p>{quantity}</p>
      <svg
        className="h-4 fill-muted-foreground cursor-pointer"
        onClick={handleIncrease}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    </div>
  );
};

export default ProductQuantitySelector;
