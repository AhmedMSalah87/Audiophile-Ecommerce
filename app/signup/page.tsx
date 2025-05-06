import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileLogo from "@/components/ProfileLogo";
import SignUp from "@/components/SignUp";

const page = async () => {
  const profileLogo = await ProfileLogo();

  return (
    <>
      <Header profileLogo={profileLogo} />
      <SignUp />
      <Footer />
    </>
  );
};

export default page;
