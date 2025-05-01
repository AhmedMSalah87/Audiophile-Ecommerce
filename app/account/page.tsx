import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileLogo from "@/components/ProfileLogo";
import SideNavigation from "@/components/SideNavigation";
import { Session } from "next-auth";

const page = async () => {
  const profileLogo = await ProfileLogo();
  const session = await auth();

  return (
    <>
      <Header profileLogo={profileLogo} />
      <SideNavigation session={session} />
      <Footer />
    </>
  );
};

export default page;
