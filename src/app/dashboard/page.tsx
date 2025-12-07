import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
