import Logo from "@/public/shared/desktop/logo.svg";
import facebook from "@/public/shared/desktop/icon-facebook.svg";
import twitter from "@/public/shared/desktop/icon-twitter.svg";
import instagram from "@/public/shared/desktop/icon-instagram.svg";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Footer = () => {
  return (
    <footer className="bg-sidebar-primary text-sidebar-primary-foreground">
      <div className="contain mx-auto pt-19 pb-12 relative footer-line w-[90%] lg:w-full">
        <div className="flex items-center md:items-start justify-between flex-col lg:flex-row mb-8 lg:mb-9">
          <img src={Logo.src} alt="" className="mb-8" />
          <NavLinks className="text-center flex flex-col md:flex-row gap-4 md:gap-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left">
          <p className="text-muted-foreground mb-14 order-1 md:col-span-2 lg:col-span-1">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we are open 7 days a week.
          </p>
          <div className="flex gap-4 lg:self-center justify-center md:justify-end lg:justify-end order-3 md:col-start-2 md:col-end-3 lg:order-2">
            <Link href="">
              <img src={facebook.src} alt="" />
            </Link>
            <Link href="">
              <img src={twitter.src} alt="" />
            </Link>
            <Link href="">
              <img src={instagram.src} alt="" />
            </Link>
          </div>
          <div className="order-2 lg:order-3 mb-12 lg:mb-0 md:col-start-1 md:col-end-2">
            <p className="text-muted-foreground ">
              Copyright 2021. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
