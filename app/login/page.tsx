import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileLogo from "@/components/ProfileLogo";
import { SignIn } from "@/components/SignIn";
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
      <SignIn />
      <Footer />
    </>
  );
};

export default page;
