import BackLink from "@/components/BackLink";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCardDetails from "@/components/ProductCardDetails";
import ProductFeatures from "@/components/ProductFeatures";
import ProductImages from "@/components/ProductImages";
import ProfileLogo from "@/components/ProfileLogo";
import StoreInfo from "@/components/StoreInfo";
import YouMayLike from "@/components/YouMayLike";
import { fetchProduct } from "@/services";
import { notFound } from "next/navigation";

export interface ProductProps {
  id?: string | number;
  slug?: string;
  name?: string;
  category?: string;
  price?: number;
  new?: boolean;
  description?: string;
  image?: { mobile: string; tablet: string; desktop: string };
  categoryImage?: { mobile: string; tablet: string; desktop: string };
  features?: string;
  gallery?: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  includes?: { quantity: number; item: string }[];
  others?: {
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string };
  }[];
}

const page = async ({
  params,
}: {
  params: Promise<{ product: ProductProps }>;
}) => {
  const profileLogo = await ProfileLogo();
  const product = await fetchProduct(params);
  if (!product) {
    notFound();
  }

  return (
    <>
      <Header profileLogo={profileLogo} />
      <BackLink />
      <ProductCardDetails product={product} />
      <ProductFeatures product={product} />
      <ProductImages product={product} />
      <YouMayLike product={product} />
      <Categories />
      <StoreInfo />
      <Footer />
    </>
  );
};

export default page;
