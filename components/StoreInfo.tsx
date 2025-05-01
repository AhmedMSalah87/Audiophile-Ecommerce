import Photo from "@/public/shared/desktop/image-best-gear.jpg";
import PhotoTablet from "@/public/shared/tablet/image-best-gear.jpg";
import PhotoMobile from "@/public/shared/mobile/image-best-gear.jpg";

const StoreInfo = () => {
  return (
    <section className="contain mx-auto mb-48">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 w-full">
        <div className="self-center w-[90%] mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
          <h2 className="mb-8 uppercase">
            Bringing you the <br />
            <span className="text-primary">best</span> audio gear
          </h2>
          <p className="text-muted-foreground">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <div className="w-[90%] lg:w-full mx-auto lg:mx-0 order-1 lg:order-2">
          <img src={Photo.src} alt="" className="rounded-md hidden lg:block" />
          <img
            src={PhotoTablet.src}
            alt=""
            className="rounded-md hidden md:block lg:hidden"
          />
          <img
            src={PhotoMobile.src}
            alt=""
            className="rounded-md block md:hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default StoreInfo;
