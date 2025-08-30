import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import CategoryHeader from "@/components/CategoryHeader";
import Products from "@/components/Products";
import StoreInfo from "@/components/StoreInfo";
import { fetchProducts, getCategories } from "@/services";
import ProfileLogo from "@/components/ProfileLogo";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const profileLogo = await ProfileLogo();
  const products = (await fetchProducts(params)) ?? []; // extract data into products variable when the params(category) changed
  const { category } = await params; // to extract category and pass as prop to products component
  //to render 404 page if using route not available in website
  const categories = await getCategories();
  if (!categories?.includes(category)) {
    notFound();
  }
  return (
    <>
      <CategoryHeader params={params} profileLogo={profileLogo} />
      <Products products={products} category={category} />
      <Categories />
      <StoreInfo />
      <Footer />
    </>
  );
};

export default page;
