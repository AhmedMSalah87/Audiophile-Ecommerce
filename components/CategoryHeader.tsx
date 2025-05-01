import React from "react";
import Header from "./Header";

const ProductsHeader = async ({
  params,
  profileLogo,
}: {
  params: Promise<{ category: string }>;
  profileLogo: React.ReactNode;
}) => {
  const { category } = await params;

  return (
    <div className="bg-foreground">
      <Header profileLogo={profileLogo} />
      <h2 className="contain mx-auto text-center py-24 text-white border-t border-t-[#979797] uppercase">
        {category}
      </h2>
    </div>
  );
};

export default ProductsHeader;
