"use client";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CartIcon from "@/components/CartIcon";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import React, { useState } from "react";
import { useOverlay } from "@/hooks/useOverlay";

const Header = ({
  className,
  profileLogo,
}: {
  className?: string;
  profileLogo: React.ReactNode; // i pass this component as prop because it is server component and cant be direct children of client component
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleOverlay } = useOverlay();
  const toggleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={cn("bg-foreground h-24 flex items-center relative", className)}
    >
      <nav className="relative contain mx-auto flex items-center justify-between w-[90%] lg:w-full">
        <Menu
          className="text-white lg:hidden cursor-pointer"
          onClick={() => {
            toggleHamburgerMenu();
            toggleOverlay();
          }}
        />
        <Logo />
        <NavLinks className="hidden lg:flex" />
        <div className="flex items-center gap-8">
          <div>{profileLogo}</div>
          <CartIcon />
        </div>
      </nav>
      {isMenuOpen && <HamburgerMenu />}
    </header>
  );
};

export default Header;
