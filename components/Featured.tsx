import pattern from "@/public/home/desktop/pattern-circles.svg";
import zx9 from "@/public/home/desktop/image-speaker-zx9.png";
import yx1 from "@/public/home/desktop/image-earphones-yx1.jpg";
import { Button } from "./ui/button";
import Link from "next/link";

const Featured = () => {
  return (
    <section className="contain mx-auto mb-56">
      <div className="mx-auto w-[90%] lg:mx-0 lg:w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-primary h-[600px] md:h-[720px] lg:h-[560px] overflow-hidden mb-6 md:mb-10 rounded-md">
          <div className="self-end relative">
            <img
              src={pattern.src}
              alt="pattern"
              className="absolute left-1/2 -top-[85%] md:-top-[120%] lg:top-0 -translate-x-1/2 lg:translate-0 lg:left-12 md:scale-[1.2]  lg:scale-[1.5] z-2"
            />
            <img
              src={zx9.src}
              alt=""
              className="w-[30%] md:w-[24%] lg:w-[65%] relative left-1/2 -translate-x-1/2 lg:left-0 lg:translate-0 lg:ml-[25%] lg:-mb-[16px] z-3"
            />
          </div>
          <div className="relative z-3 self-center md:px-24 mx-auto ">
            <div className="min-w-[280px] max-w-[350px] text-center lg:text-left">
              <h2 className="text-background mb-6">
                ZX9 <br />
                SPEAKER
              </h2>
              <p className="text-secondary mb-10">
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Button asChild variant="secondary">
                <Link href="/speakers/zx9-speaker">SEE PRODUCT</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-[url(../public/home/desktop/image-speaker-zx7.jpg)] bg-cover h-80 flex items-center mb-6 md:mb-12 rounded-md">
          <div className="pl-15 lg:pl-24">
            <h4 className="mb-8">ZX7 SPEAKER</h4>
            <Button asChild variant="outline">
              <Link href="/speakers/zx7-speaker">SEE PRODUCT</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
          <div>
            <img src={yx1.src} alt="" className="rounded-md w-full" />
          </div>
          <div className="bg-secondary flex items-center py-10 md:py-0 pl-10 lg:pl-24 rounded-md">
            <div>
              <h4 className="mb-8">YX1 EARPHONES</h4>
              <Button asChild variant="outline">
                <Link href="/earphones/yx1-earphones">SEE PRODUCT</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
