"use client";

import React, { useState } from "react";
import Courses from "@/components/Courses";
import Filters from "@/components/Filters";
import Sidebar from "@/components/Sidebar";

export type FiltersState = {
  featured: boolean; // Saved Courses toggle
  boards: string[];
  classes: string[];
  subjects: string[];
  medium: string[];
};

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FiltersState>({
    featured: false,
    boards: [],
    classes: [],
    subjects: [],
    medium: [],
  });

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleToggleSubject = (subject: string) => {
    setFilters((prev) => ({
      ...prev,
      subjects: toggleInArray(prev.subjects, subject),
    }));
  };

  const handleToggleBoard = (board: string) => {
    setFilters((prev) => ({
      ...prev,
      boards: toggleInArray(prev.boards, board),
    }));
  };

  const handleToggleClass = (cls: string) => {
    setFilters((prev) => ({
      ...prev,
      classes: toggleInArray(prev.classes, cls),
    }));
  };

  const handleToggleFeatured = () => {
    setFilters((prev) => ({
      ...prev,
      featured: !prev.featured,
    }));
  };

  const handleToggleSchoolMedium = (medium: string) => {
    setFilters((prev) => ({
      ...prev,
      medium: toggleInArray(prev.medium, medium),
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      featured: false,
      boards: [],
      classes: [],
      subjects: [],
      medium: [],
    });
    setSearchQuery("");
  };

  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <div className="flex place-content-start items-start justify-center flex-[1_0_0] flex-row gap-2 h-[97.5vh] overflow-hidden p-0 relative w-px">
        <Filters
          filters={filters}
          onToggleFeatured={handleToggleFeatured}
          onToggleSubject={handleToggleSubject}
          onToggleBoard={handleToggleBoard}
          onToggleClass={handleToggleClass}
          onToggleSchoolMedium={handleToggleSchoolMedium}
          onReset={handleResetFilters}
        />
        <Courses
          filters={filters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
