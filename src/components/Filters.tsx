import React from "react";
import { X } from "lucide-react";

type FiltersState = {
  featured: boolean;
  boards: string[];
  classes: string[];
  subjects: string[];
  medium: string[];
};

type FiltersProps = {
  filters: FiltersState;
  onToggleFeatured: () => void;
  onToggleSubject: (subject: string) => void;
  onToggleBoard: (board: string) => void;
  onToggleClass: (cls: string) => void;
  onToggleSchoolMedium: (medium: string) => void;
  onReset: () => void;
  setIsFiltersOpen?: (open: boolean) => void;
};

const Filters: React.FC<FiltersProps> = ({
  filters,
  onToggleFeatured,
  onToggleSubject,
  onToggleBoard,
  onToggleClass,
  onToggleSchoolMedium,
  onReset,
  setIsFiltersOpen,
}) => {
  const subjects = [
    {
      subject: "English",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive-icon lucide-case-sensitive"><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/></svg>`,
    },
    {
      subject: "Hindi",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages-icon lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    },
    {
      subject: "Marathi",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages-icon lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    },
    {
      subject: "Maths",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pi-icon lucide-pi"><line x1="9" x2="9" y1="4" y2="20"/><path d="M4 7c0-1.7 1.3-3 3-3h13"/><path d="M18 20c-1.7 0-3-1.3-3-3V4"/></svg>`,
    },
    {
      subject: "Science",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-microscope-icon lucide-microscope"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
    },
    {
      subject: "History",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history-icon lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>`,
    },
    {
      subject: "Geography",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    },
  ];

  const boards = [
    { board: "MSBHSE" },
    { board: "CBSE" },
    { board: "ICSE" },
    { board: "Other" },
  ];

  const classLevels = ["8th", "9th", "10th", "11th", "12th"];

  const schoolMediums = ["English", "Hindi", "Marathi", "Semi"];

  return (
    <div className="flex-none h-[97.5vh] relative max-w-[371px]">
      <div className="border border-[rgba(25,26,32,0.08)] bg-white rounded-2xl opacity-100 flex place-content-start items-start flex-col gap-0 h-full overflow-visible p-0 relative w-full">
        {/* Header */}
        <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-visible py-5 px-6 relative w-full border-b border-[rgba(25,26,32,0.12)] opacity-100">
          <h4 className="text-2xl text-[#193625] tracking-tight">Filters</h4>
          <button
            aria-label="Close filters"
            onClick={() => setIsFiltersOpen?.(false)}
            className="md:hidden block p-2 cursor-pointer rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex place-content-start items-start flex-[1_0_0] flex-col gap-6 h-px overflow-auto p-0 relative w-full">
          <div className="flex content-start items-start flex-[1_0_0] flex-col gap-8 h-px justify-start overflow-auto py-4 px-4 pb-14 relative w-full">
            {/* Saved Courses */}
            <div className="flex place-content-start items-start flex-none flex-col gap-3 h-min overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">Saved Courses</p>
              <button
                type="button"
                onClick={onToggleFeatured}
                className={`flex-none h-[30px] relative w-[61px] rounded-2xl cursor-pointer transition-colors ${
                  filters.featured ? "bg-[#193625]" : "bg-[#ededed]"
                }`}
              >
                <div
                  className={`flex-none h-6 w-[25px] absolute top-[calc(50%-12px)] bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.08)] transition-all ${
                    filters.featured ? "right-[3px]" : "left-[3px]"
                  }`}
                />
              </button>
            </div>

            {/* SUBJECTS */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">SUBJECTS</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] grid-rows-2 h-min justify-center overflow-visible p-0 relative w-full">
                {subjects.map((item, index) => {
                  const isActive = filters.subjects.includes(item.subject);
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleSubject(item.subject)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625] text-white"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <div className="flex-none h-5 w-5 relative">
                          <div
                            className={`w-6 h-6 ${
                              isActive ? "text-white" : "text-black"
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          />
                        </div>
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item.subject}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BOARD */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">BOARD</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] grid-rows-2 h-min justify-center overflow-visible p-0 relative w-full">
                {boards.map((item, index) => {
                  const isActive = filters.boards.includes(item.board);
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleBoard(item.board)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625]"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item.board}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MEDIUM */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">MEDIUM</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] grid-rows-2 h-min justify-center overflow-visible p-0 relative w-full">
                {schoolMediums.map((item, index) => {
                  const isActive = filters.medium.includes(item);
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleSchoolMedium(item)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625]"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CLASS LEVEL */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">CLASS LEVEL</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] grid-rows-2 h-min justify-center overflow-visible p-0 relative w-full">
                {classLevels.map((item, index) => {
                  const isActive = filters.classes.includes(item);
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleClass(item)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625]"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Reset */}
        <div className="flex place-content-center items-center flex-none flex-row gap-2.5 h-min overflow-hidden p-6 relative w-full border-t border-[rgba(25,26,32,0.12)] opacity-100">
          <button
            type="button"
            onClick={onReset}
            className="flex-[1_0_0] h-12 relative w-px"
          >
            <div className="border border-black bg-transparent w-full h-12 rounded-lg opacity-100 flex place-content-center items-center cursor-pointer flex-row gap-2.5 overflow-hidden py-6 px-4 relative">
              <p className="text-sm text-[#191a20] text-center">
                Reset Filters
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
