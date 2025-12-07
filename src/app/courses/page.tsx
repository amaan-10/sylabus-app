import Courses from "@/components/Courses";
import Filters from "@/components/Filters";
import Sidebar from "@/components/Sidebar";
import React from "react";

const CoursesPage = () => {
  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <div className="flex place-content-start items-start justify-center flex-[1_0_0] flex-row gap-2 h-[97.5vh] overflow-hidden p-0 relative w-px">
        <Filters />
        <Courses />
      </div>
    </div>
  );
};

export default CoursesPage;
