import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import PrivacyPolicy from "@/components/policies/PrivacyPolicy";

const PrivacyPolicyPage = async () => {
  const hasSession = Boolean((await cookies()).get("session"));
  return (
    <div>
      <Navbar hasSession={hasSession} />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
