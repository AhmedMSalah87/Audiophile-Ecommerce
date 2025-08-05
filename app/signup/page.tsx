import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileLogo from "@/components/ProfileLogo";
import SignUp from "@/components/SignUp";
import { redirect } from "next/navigation";

const page = async () => {
  const profileLogo = await ProfileLogo();
  // to prevent access this page if user is already authenticated
  const session = await auth();
  if (session) {
    redirect("/account");
  }

  return (
    <>
      <Header profileLogo={profileLogo} />
      <SignUp />
      <Footer />
    </>
  );
};

export default page;
