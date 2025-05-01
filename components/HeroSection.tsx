import React from "react";
import Header from "./Header";
import HeroContent from "./HeroContent";

const HeroSection = ({ profileLogo }: { profileLogo: React.ReactNode }) => {
  return (
    <div className="mb-60 lg:bg-[url(/home/desktop/image-hero.jpg)] md:bg-[url(/home/tablet/image-header.jpg)] bg-[url(/home/mobile/image-header.jpg)] h-screen bg-center bg-cover">
      <Header className="bg-transparent" profileLogo={profileLogo} />
      <HeroContent />
    </div>
  );
};

export default HeroSection;
