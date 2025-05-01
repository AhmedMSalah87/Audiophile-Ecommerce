import Footer from "@/components/Footer";
import StoreInfo from "@/components/StoreInfo";
import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import HeroSection from "@/components/HeroSection";
import ProfileLogo from "@/components/ProfileLogo";

const page = async () => {
  const profileLogo = await ProfileLogo();
  return (
    <>
      <HeroSection profileLogo={profileLogo} />
      <Categories />
      <Featured />
      <StoreInfo />
      <Footer />
    </>
  );
};

export default page;
