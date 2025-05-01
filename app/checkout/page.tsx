import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { auth } from "@/auth";
import BackLink from "@/components/BackLink";
import ProfileLogo from "@/components/ProfileLogo";

const CheckoutPage = async () => {
  const profileLogo = await ProfileLogo();
  const session = await auth();
  return (
    <div className="bg-secondary">
      <Header profileLogo={profileLogo} />
      <BackLink />
      <CheckoutForm session={session} />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
