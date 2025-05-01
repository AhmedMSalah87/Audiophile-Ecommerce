"use client";

import cart from "@/public/shared/desktop/icon-cart.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import Cart from "./Cart";
import { useOverlay } from "@/hooks/useOverlay";
import { useAppSelector } from "@/hooks/hooks";

const CartIcon = () => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { toggleOverlay } = useOverlay();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const toggleCart = () => {
    setIsCartVisible((prevState) => !prevState);
  };

  return (
    <div className="relative" ref={iconRef}>
      <Image
        className="cursor-pointer"
        src={cart}
        alt="cart"
        onClick={(e) => {
          toggleCart();
          toggleOverlay();
        }}
      />
      {cartItems.length > 0 && (
        <div className="size-6 bg-primary rounded-full flex items-center justify-center absolute -top-[50%] -right-[50%] font-bold text-white">
          <div>{cartItems.length}</div>
        </div>
      )}
      {isCartVisible && (
        <Cart onClose={() => setIsCartVisible(false)} iconRef={iconRef}></Cart>
      )}
    </div>
  );
};

export default CartIcon;
