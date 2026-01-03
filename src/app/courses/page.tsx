import Courses from "@/components/Courses";
import Sidebar from "@/components/Sidebar";

const CoursesPage = () => {
  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <Courses />
    </div>
  );
};

export default CoursesPage;
