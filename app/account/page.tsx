import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileLogo from "@/components/ProfileLogo";
import SideNavigation from "@/components/SideNavigation";
import { getOrdersByUserId } from "@/services";
import { redirect } from "next/navigation";

const page = async () => {
  const profileLogo = await ProfileLogo();
  const session = await auth();
  const userId = session?.user.userId;
  if (!userId) {
    redirect("/login"); // or throw an error
  }
  const orders = await getOrdersByUserId(userId);

  return (
    <>
      <Header profileLogo={profileLogo} />
      <SideNavigation session={session} orders={orders} />
      <Footer />
    </>
  );
};

export default page;
