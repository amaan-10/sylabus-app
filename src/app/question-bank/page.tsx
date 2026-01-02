import QuestionBank from "@/components/QuestionBank";
import Sidebar from "@/components/Sidebar";
import React from "react";

const QuestionBankPage = () => {
  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <QuestionBank />
    </div>
  );
};

export default QuestionBankPage;
