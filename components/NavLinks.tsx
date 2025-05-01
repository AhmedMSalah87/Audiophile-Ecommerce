import { cn } from "@/lib/utils";
import Link from "next/link";

const NavLinks = ({ className }: { className?: string }) => {
  return (
    <ul className={cn("flex gap-8 text-background font-semibold", className)}>
      <li>
        <Link href="/" className="hover:text-primary">
          HOME
        </Link>
      </li>
      <li>
        <Link href="/headphones" className="hover:text-primary">
          HEADPHONES
        </Link>
      </li>
      <li>
        <Link href="/speakers" className="hover:text-primary">
          SPEAKERS
        </Link>
      </li>
      <li>
        <Link href="/earphones" className="hover:text-primary">
          EARPHONES
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
