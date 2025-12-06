"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BookOpen, MapPin, Star, Users, Bookmark } from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    featured: false,
    boards: [],
    classes: [],
    subjects: [],
    courseTypes: [],
  });
  const [bookmarked, setBookmarked] = useState(false);

  const courses = [
    {
      id: 1,
      imgSrc: "/eng-img.png",
      imgAlt: "english",
      title: "English",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 2,
      imgSrc: "/mar-img.png",
      imgAlt: "marathi",
      title: "Marathi",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 3,
      imgSrc: "/hin-img.png",
      imgAlt: "hindi",
      title: "Hindi",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 4,
      imgSrc: "/sci-img.png",
      imgAlt: "science",
      title: "Science",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 5,
      imgSrc: "/math-img.png",
      imgAlt: "maths",
      title: "Maths",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 6,
      imgSrc: "/hist-img.png",
      imgAlt: "history",
      title: "History",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 7,
      imgSrc: "/geo-img.png",
      imgAlt: "geography",
      title: "Geography",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
  ];
  return (
    <div className="border border-[rgba(25,26,32,0.08)] rounded-2xl flex content-center items-center flex-[1_0_0] flex-col gap-0 h-[97.5vh] justify-center overflow-visible p-px relative w-px">
      <div className="flex content-center items-center flex-none flex-row gap-4 h-min justify-center overflow-hidden p-4 relative w-full">
        <div className="border-[0.5px] border-[rgba(26,27,33,0.13)] bg-white rounded-lg flex content-center items-center flex-[1_0_0] flex-row gap-2.5 h-11 justify-start overflow-hidden py-3 px-2 pl-3 relative w-px">
          <div className="flex-none h-5 w-5 relative shrink-0 [image-rendering:pixels] fill-black text-black">
            <div className="svgContainer w-full h-full aspect-[inherit]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191a2066"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>
          </div>
          <div className="flex-[1_0_0] h-[204%] relative w-px">
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full bg-transparent border-none text-[16px] leading-[1em] font-normal text-[#b8b8b8] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg overflow-hidden  h-full flex flex-col"
              >
                {/* Image container */}
                <div className="relative h-44 bg-muted overflow-hidden rounded-xl">
                  <Image
                    width={512}
                    height={512}
                    src={course.imgSrc || "/placeholder.svg"}
                    alt={course.imgAlt || "Course Image"}
                    className="w-full h-full object-cover"
                  />
                  {/* Tags overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-end p-3 gap-2">
                    <span className="inline-block bg-white text-foreground text-xs font-medium px-3 py-1 rounded">
                      {/* {course.type} */} 8th
                    </span>
                    <span className="inline-block bg-white text-foreground text-xs font-medium px-3 py-1 rounded">
                      {/* {course.subject} */} SSC
                    </span>
                  </div>
                  {/* Bookmark button */}
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className="absolute top-3 right-3 bg-white rounded-md p-2 hover:bg-muted transition-colors"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        bookmarked
                          ? "fill-foreground text-foreground"
                          : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Meta info - board, class, rating */}
                  {/* <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {course.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </span>
                  </div> */}

                  {/* Description */}
                  {/* <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {course.description}
                  </p> */}

                  {/* Course details - icons */}
                  {/* <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 py-3 border-t border-b border-border">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.class}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {course.board}
                    </span>
                  </div> */}

                  {/* Price */}
                  {/* <div className="text-lg font-bold text-foreground">
                    {course.price}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
