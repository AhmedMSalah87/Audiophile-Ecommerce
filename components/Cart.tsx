"use client";

import { Button } from "./ui/button";
import CartQuantitySelector from "./CartQuantitySelector";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { clearCart } from "../cartSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useOverlay } from "@/hooks/useOverlay";

interface CartProps {
  onClose: () => void;
  iconRef: React.RefObject<HTMLDivElement | null>;
}

const Cart = ({ onClose, iconRef }: CartProps) => {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const { setIsOverlayVisible } = useOverlay();
  // to show products in cart
  const cart = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = cart.reduce(
    (total, item) =>
      // the second parameter is item which is product object inside cart array
      total + item.price * item.quantity,
    0
  );
  // to get dispatch action
  const dispatch = useAppDispatch();
  const router = useRouter();

  //logic for closing cart and overlay when clicking on any part outside cart using useRef hook
  //to target cart and its icon to exclude them from document when click event triggered
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedOutsideCart =
        //Ensures cartRef.current exists (is not null) before calling .contains and output final will be true if click outside cart
        cartRef.current && !cartRef.current.contains(event.target as Node);
      const clickedOutsideIcon =
        iconRef.current && !iconRef.current.contains(event.target as Node);
      if (clickedOutsideCart && clickedOutsideIcon) {
        onClose();
        setIsOverlayVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, setIsOverlayVisible]);

  return (
    <div
      className="bg-background absolute w-100 right-0 top-20 p-8 z-200 rounded-md"
      ref={cartRef}
    >
      <div className="flex items-center justify-between mb-8">
        <h6>{cart.length > 0 ? `CART (${cart.length})` : "Cart"}</h6>
        <p
          className="cart__remove"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(clearCart())}
        >
          Remove all
        </p>
      </div>
      {cart.length > 0 ? (
        cart.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image.desktop}
                  alt={item.name}
                  className="w-[30%] rounded-md"
                />
                <div>
                  <p className="font-bold">
                    {item.name.split(" ").slice(0, -1).join(" ")}
                  </p>
                  <p className="text-muted-foreground font-semibold">
                    $ {item.price}
                  </p>
                </div>
              </div>
              <CartQuantitySelector product={item} />
            </div>
          );
        })
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground font-semibold">TOTAL</p>
        <p className="font-bold">$ {totalPrice}</p>
      </div>
      <Button
        className="w-full"
        onClick={() => router.push("/checkout")}
        disabled={cart.length === 0}
      >
        CHECKOUT
      </Button>
    </div>
  );
};

export default Cart;
