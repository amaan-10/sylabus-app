"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BookOpen, MapPin, Star, Users, Bookmark } from "lucide-react";

const Search = () => {
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
      title: "Advanced Mathematics (CBSE)",
      board: "CBSE",
      class: "12th",
      subject: "Mathematics",
      type: "Online",
      instructor: "Prof. Sharma",
      location: "Delhi",
      rating: 4.8,
      students: 245,
      description:
        "Master calculus and algebra with expert guidance. Comprehensive lessons covering all board exam topics...",
      price: "₹2,499",
      image: "/mathematics-classroom-calculus.jpg",
    },
    {
      id: 2,
      title: "Physics Fundamentals (SSC)",
      board: "SSC",
      class: "10th",
      subject: "Physics",
      type: "Hybrid",
      instructor: "Dr. Patel",
      location: "Mumbai",
      rating: 4.7,
      students: 189,
      description:
        "Understand physics concepts through real-world applications. Complete course from motion to modern physics...",
      price: "₹1,999",
      image: "/physics-lab-experiment.jpg",
    },
    {
      id: 3,
      title: "English Literature (ICSE)",
      board: "ICSE",
      class: "11th",
      subject: "English",
      type: "Online",
      instructor: "Ms. Verma",
      location: "Bangalore",
      rating: 4.9,
      students: 312,
      description:
        "Explore classic and contemporary literature. Develop critical thinking and writing skills through guided analysis...",
      price: "₹1,799",
      image: "/library-books-literature.jpg",
    },
    {
      id: 4,
      title: "Chemistry Lab Course (CBSE)",
      board: "CBSE",
      class: "12th",
      subject: "Chemistry",
      type: "Hybrid",
      instructor: "Dr. Gupta",
      location: "Pune",
      rating: 4.6,
      students: 156,
      description:
        "Hands-on chemistry learning with laboratory experiments. Understand organic, inorganic, and physical chemistry...",
      price: "₹2,799",
      image: "/chemistry-lab-beakers.jpg",
    },
    {
      id: 5,
      title: "Biology Complete (SSC/CBSE)",
      board: "SSC",
      class: "9th",
      subject: "Biology",
      type: "Online",
      instructor: "Prof. Desai",
      location: "Chennai",
      rating: 4.7,
      students: 234,
      description:
        "Comprehensive biology course covering cell biology, genetics, and ecology. Perfect for board exams...",
      price: "₹1,699",
      image: "/biology-cells-microscope.png",
    },
    {
      id: 6,
      title: "Social Studies (ICSE)",
      board: "ICSE",
      class: "8th",
      subject: "Social Studies",
      type: "Online",
      instructor: "Mr. Iyer",
      location: "Hyderabad",
      rating: 4.5,
      students: 178,
      description:
        "History, geography, and civics integrated learning. Interactive sessions with map-based learning...",
      price: "₹1,499",
      image: "/history-geography-maps.jpg",
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
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Tags overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-end p-3 gap-2">
                    <span className="inline-block bg-white text-foreground text-xs font-medium px-3 py-1 rounded">
                      {course.type}
                    </span>
                    <span className="inline-block bg-white text-foreground text-xs font-medium px-3 py-1 rounded">
                      {course.subject}
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
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Meta info - board, class, rating */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {course.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {course.description}
                  </p>

                  {/* Course details - icons */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 py-3 border-t border-b border-border">
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
                  </div>

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

export default Search;
