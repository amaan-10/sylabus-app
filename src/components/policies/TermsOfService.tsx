"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsOfService = () => {
  const sections = [
    {
      id: 1,
      title: "Definitions",
      body: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>“Sylabus”, “we”, “our”, or “us”</strong> refers to the
            Sylabus platform and its operators.
          </li>
          <li>
            <strong>“User”, “you”, or “your”</strong> refers to any teacher,
            student, institution, or individual using Sylabus.
          </li>
          <li>
            <strong>“Services”</strong> means the features provided by Sylabus,
            including question paper generation, educational tools,
            subscriptions, and future learning services.
          </li>
        </ul>
      ),
    },
    {
      id: 2,
      title: "Services provided",
      body: (
        <p>
          Sylabus provides a digital platform for generating structured,
          syllabus-aligned question papers and related educational tools.
          Services may evolve over time, and access to certain features may
          depend on subscription plans or usage limits.
        </p>
      ),
    },
    {
      id: 3,
      title: "Use of services",
      body: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the platform only for lawful educational purposes</li>
          <li>Provide accurate and up-to-date information</li>
          <li>Do not misuse, copy, or attempt to disrupt the platform</li>
          <li>
            Do not share paid or restricted features with unauthorized users
          </li>
        </ul>
      ),
    },
    {
      id: 4,
      title: "Accounts, subscriptions & payments",
      body: (
        <p>
          Some features of Sylabus require a paid subscription. Pricing, plan
          details, and usage limits are displayed within the platform. Payments
          are processed through authorized third-party providers and are
          non-refundable unless explicitly stated otherwise.
        </p>
      ),
    },
    {
      id: 5,
      title: "Intellectual property",
      body: (
        <p>
          All content, software, templates, designs, and algorithms used by
          Sylabus remain our intellectual property. Users are granted a limited,
          non-exclusive, non-transferable license to use generated content for
          personal or institutional educational purposes only.
        </p>
      ),
    },
    {
      id: 6,
      title: "Data & confidentiality",
      body: (
        <p>
          User data is handled in accordance with our Privacy Policy. Users are
          responsible for maintaining the confidentiality of their account
          credentials and any generated content.
        </p>
      ),
    },
    {
      id: 7,
      title: "Limitation of liability",
      body: (
        <p>
          Sylabus is provided on an “as is” and “as available” basis. We are not
          liable for any indirect, incidental, or consequential damages arising
          from the use or inability to use the platform, to the extent permitted
          by law.
        </p>
      ),
    },
    {
      id: 8,
      title: "Termination",
      body: (
        <p>
          We reserve the right to suspend or terminate access to Sylabus if
          these Terms are violated. Users may stop using the platform at any
          time, but any outstanding payments remain payable.
        </p>
      ),
    },
    {
      id: 9,
      title: "Changes to terms",
      body: (
        <p>
          We may update these Terms & Conditions as Sylabus evolves. Continued
          use of the platform after changes implies acceptance of the updated
          terms.
        </p>
      ),
    },
    {
      id: 10,
      title: "Governing law",
      body: (
        <p>
          These Terms & Conditions are governed by the laws of India, and any
          disputes shall be subject to the jurisdiction of the courts in India.
        </p>
      ),
    },
  ];

  return (
    <div className="p-[128px_48px_0px] min-h-screen bg-white text-[#13261b] font-poppins">
      <div className="max-w-[600px] mx-auto">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-slate-100 px-4 py-1.5 text-xs font-normal text-[#5e6b64]">
            Policies
          </span>
        </div>

        <div className="">
          <h1 className="mb-24 text-[3.75rem] sm:text-[80px] font-normal leading-none tracking-tight text-[#13261b]">
            Terms & Conditions
          </h1>

          <p className="max-w-2xl text-base text-[#5e6b64]">
            Welcome to Sylabus, an educational technology platform designed to
            help teachers and educators generate syllabus-aligned question
            papers and support smart learning. By accessing or using our
            platform and services, you agree to the following Terms &
            Conditions.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} className="relative">
              {section.id === 2 && (
                <div className="absolute -left-6 top-3 pointer-events-none">
                  <div className="w-72 h-10 rounded-full bg-linear-to-r from-slate-300 via-slate-100 to-white blur-2xl opacity-30" />
                </div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative z-10 text-2xl sm:text-[48px] font-poppins text-[#13261b] mt-10"
              >
                {section.id}. {section.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="relative z-10 text-base leading-relaxed text-[#5e6b64] max-w-2xl mt-5"
              >
                {section.body}
              </motion.div>
            </section>
          ))}
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
};
export default TermsOfService;
