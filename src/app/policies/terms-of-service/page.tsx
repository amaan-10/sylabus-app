import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import TermsOfService from "@/components/policies/TermsOfService";

const TermsOfServicePage = async () => {
  const hasSession = Boolean((await cookies()).get("session"));

  return (
    <div>
      <main className=" min-h-screen w-full relative flex flex-col flex-nowrap items-center justify-start gap-0 h-min overflow-visible bg-[#fefefe] font-poppins">
        <Navbar hasSession={hasSession} />
        <TermsOfService />
        <Footer />
      </main>
    </div>
  );
};

export default TermsOfServicePage;
