import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/shared/desktop/logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logoImage} alt="logo" />
    </Link>
  );
};

export default Logo;
