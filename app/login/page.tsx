import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileLogo from "@/components/ProfileLogo";
import { SignIn } from "@/components/SignIn";

const page = async () => {
  const profileLogo = await ProfileLogo();

  return (
    <>
      <Header profileLogo={profileLogo} />
      <SignIn />
      <Footer />
    </>
  );
};

export default page;
