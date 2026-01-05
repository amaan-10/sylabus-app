"use client";
import { motion } from "framer-motion";
const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Information we collect",
      body: (
        <ul className="list-disc pl-8 space-y-2">
          <li>
            <strong>Account Information:</strong> such as your name, mobile
            number, email address, role (teacher/student), board, medium, and
            class level when you sign up or use Sylabus.
          </li>
          <li>
            <strong>Educational Preferences:</strong> including selected boards,
            subjects, classes, chapters, exam patterns, and question paper
            configurations.
          </li>
          <li>
            <strong>Usage Data:</strong> such as pages visited, features used,
            device information, IP address, and app interactions collected for
            analytics and performance improvement.
          </li>
        </ul>
      ),
    },
    {
      id: 2,
      title: "How we use your information",
      body: (
        <ul className="list-disc pl-8 space-y-2">
          <li>Generate structured and syllabus-aligned question papers</li>
          <li>
            Personalize your experience based on board, class, and subject
          </li>
          <li>Manage subscriptions, access tiers, and usage limits</li>
          <li>Improve features, performance, and future learning tools</li>
          <li>
            Communicate important updates, changes, or support-related messages
          </li>
        </ul>
      ),
    },
    {
      id: 3,
      title: "Sharing your information",
      body: (
        <p>
          Sylabus does not sell or rent your personal data. Information may be
          shared only with trusted third-party services (such as authentication,
          payment processing, analytics, or cloud storage providers) strictly to
          operate and improve the platform, and always under confidentiality
          obligations.
        </p>
      ),
    },
    {
      id: 4,
      title: "Data security",
      body: (
        <p>
          We follow industry-standard security practices to protect your data.
          This includes secure storage, encrypted communication, and restricted
          access. While no system is 100% secure, we continuously work to
          safeguard your information.
        </p>
      ),
    },
    {
      id: 5,
      title: "Your rights",
      body: (
        <ul className="list-disc pl-8 space-y-2">
          <li>Access and review your personal information</li>
          <li>Update or correct inaccurate details</li>
          <li>Request deletion of your account and associated data</li>
          <li>Withdraw consent where applicable</li>
        </ul>
      ),
    },
    {
      id: 6,
      title: "Cookies & analytics",
      body: (
        <p>
          Sylabus uses cookies and similar technologies to enhance user
          experience, understand usage patterns, and improve platform
          performance. You can control cookie preferences through your browser
          settings.
        </p>
      ),
    },
    {
      id: 7,
      title: "Data retention",
      body: (
        <p>
          We retain your data only for as long as necessary to provide our
          services, comply with legal requirements, or improve the platform. You
          may request data deletion at any time.
        </p>
      ),
    },
    {
      id: 8,
      title: "Changes to this policy",
      body: (
        <p>
          We may update this Privacy Policy as Sylabus evolves. Any changes will
          be reflected on this page with an updated effective date.
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
            Privacy policy
          </h1>

          <p className="max-w-2xl text-base text-[#5e6b64]">
            At Sylabus, we value your privacy and are committed to protecting
            your information. This Privacy Policy explains how we collect, use,
            and safeguard your data when you use our platform to generate
            question papers, access learning tools, visit our website, or
            interact with our services.
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

export default PrivacyPolicy;
