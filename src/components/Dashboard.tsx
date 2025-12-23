"use client";
import {
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Crown,
  NotepadText,
  Sparkle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  BoardSlug,
  ClassKey,
  getSubjectsFor,
  MediumSlug,
} from "@/lib/subjects";

type UserData = {
  firebaseUid: string;
  name: string;
  phone: string;
  gender: string;
  role: string;
  board: string;
  medium: string;
  classLevel: string;
  userTier: string;
};

type SubjectData = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  board: string;
  medium: string;
  classLevel: string;
  chapterCount: number;
  questionCount: number;
  // details: string[];
  link: string;
};

const boardMediumMap = {
  CBSE: ["English", "Hindi"],
  MSBSHSE: ["English", "Semi-English", "Marathi"],
  ICSE: ["English"],
};

const boardClassMap = {
  CBSE: [
    "8th",
    "9th",
    "10th",
    "11th Humanities",
    "11th Commerce",
    "11th Science",
    "12th Humanities",
    "12th Commerce",
    "12th Science",
  ],
  MSBSHSE: [
    "8th",
    "9th",
    "10th",
    "11th Arts",
    "11th Commerce",
    "11th Science",
    "12th Arts",
    "12th Commerce",
    "12th Science",
  ],
  ICSE: ["8th", "9th", "10th"],
};

const Dashboard = () => {
  const dashboardFeatures = [
    {
      title: "Auto-Generate Exam Paper",
      description: "Instantly create syllabus-aligned papers using AI.",
      imageSrc: "/features/auto-generate.png",
      imageAlt: "Auto Generate Question Paper",
      href: "./auto-generate",
    },
    {
      title: "Custom Paper",
      description: "Manually select questions and structure your paper.",
      imageSrc: "/features/custom-paper.png",
      imageAlt: "Custom Paper",
      href: "./custom-paper",
    },
    {
      title: "Quick Quiz Generator",
      description: "Create short quizzes for quick tests in seconds.",
      imageSrc: "/features/quick-quiz.png",
      imageAlt: "Quick Quiz Generator",
      href: "./quick-quiz",
    },
    {
      title: "Question Bank Explorer",
      description: "Browse and filter AI-generated questions easily.",
      imageSrc: "/features/question-bank.png",
      imageAlt: "Question Bank Explorer",
      href: "./question-bank",
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const classLevels = [
    {
      id: 1,
      imgSrc: "/8-img.png",
      imgAlt: "class 8",
      title: "Class 8",
      badges: ["MSBHSE", "Marathi Medium"],
      details: ["7 Subjects", "1,200 Resources"],
      link: "./courses/msbshse/marathi-medium/class-8",
    },
    {
      id: 2,
      imgSrc: "/9-img.png",
      imgAlt: "class 9",
      title: "Class 9",
      badges: ["MSBHSE", "Semi-English Medium"],
      details: ["8 Subjects", "1,200 Resources"],
      link: "./courses/msbshse/semi-english-medium/class-9",
    },
    {
      id: 3,
      imgSrc: "/10-img.png",
      imgAlt: "class 10",
      title: "Class 10",
      badges: ["MSBHSE", "English Medium"],
      details: ["9 Subjects", "1,200 Resources"],
      link: "./courses/msbshse/english-medium/class-10",
    },
    {
      id: 4,
      imgSrc: "/11-img.png",
      imgAlt: "class 11 commerce",
      title: "Class 11 - Commerce",
      badges: ["CBSE", "English Medium"],
      details: ["8 Subjects", "1,200 Resources"],
      link: "./courses/cbse/english-medium/class-11-commerce",
    },
    {
      id: 5,
      imgSrc: "/12-img.png",
      imgAlt: "class 12 science",
      title: "Class 12 - Science",
      badges: ["MSBHSE", "English Medium"],
      details: ["8 Subjects", "1,200 Resources"],
      link: "./courses/msbshse/english-medium/class-12-science",
    },
  ];

  const boards = [
    {
      id: 1,
      imgSrc: "/boards/msbshse.jpg",
      imgAlt: "msbshse board",
      title: "Maharashtra Board (MSBHSE)",
      badges: ["Popular", "Recommended"],
      details: ["5 Classes", "5,432 Resources"],
      link: "./courses/msbshse",
    },
    {
      id: 2,
      imgSrc: "/boards/cbse.jpg",
      imgAlt: "cbse board",
      title: "CBSE Board",
      badges: ["Popular", "Recommended"],
      details: ["5 Classes", "5,432 Resources"],
      link: "./courses/cbse",
    },
    {
      id: 3,
      imgSrc: "/boards/icse.jpg",
      imgAlt: "icse board",
      title: "ICSE Board",
      badges: ["Popular", "Recommended"],
      details: ["5 Classes", "5,432 Resources"],
      link: "./courses/icse",
    },
  ];

  // const subjects = [
  //   {
  //     id: 1,
  //     imgSrc: "/eng-img.png",
  //     imgAlt: "english",
  //     title: "English",
  //     badges: ["CBSE - English Medium", "11th"],
  //     details: ["8 Chapters", "1,235 Questions"],
  //     link: "./courses/cbse/english-medium/class-11/english",
  //   },
  //   {
  //     id: 2,
  //     imgSrc: "/mar-img.png",
  //     imgAlt: "marathi",
  //     title: "Marathi",
  //     badges: ["MSBHSE - Marathi Medium", "9th"],
  //     details: ["8 Chapters", "1,235 Questions"],
  //     link: "./courses/msbshse/marathi-medium/class-9/marathi",
  //   },
  //   {
  //     id: 3,
  //     imgSrc: "/hin-img.png",
  //     imgAlt: "hindi",
  //     title: "Hindi",
  //     badges: ["CBSE - English Medium", "10th"],
  //     details: ["8 Chapters", "1,235 Questions"],
  //     link: "./courses/cbse/english-medium/class-10/hindi",
  //   },
  //   {
  //     id: 4,
  //     imgSrc: "/sci-img.png",
  //     imgAlt: "science",
  //     title: "Science",
  //     badges: ["ICSE - English Medium", "8th"],
  //     details: ["8 Chapters", "1,235 Questions"],
  //     link: "./courses/icse/english-medium/class-10/hindi",
  //   },
  //   {
  //     id: 5,
  //     imgSrc: "/math-img.png",
  //     imgAlt: "maths",
  //     title: "Maths",
  //     badges: ["MSBHSE - English Medium", "8th"],
  //     details: ["8 Chapters", "1,235 Questions"],
  //     link: "./courses/msbshse/english-medium/class-8/maths",
  //   },
  // ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserData>();
  const [savedSubjectIds, setSavedSubjectIds] = useState<string[]>([]);
  const [subjectStats, setSubjectStats] = useState<
    Record<string, { chapterCount: number; questionCount: number }>
  >({});

  const formattedBoard = data?.board.toLowerCase();
  const formattedMedium = normalizeMedium(data?.medium);
  const formattedClassLevel = normalizeClassLevel(data?.classLevel);

  const subjects = getSubjectsFor(
    formattedBoard as BoardSlug,
    formattedMedium as MediumSlug,
    formattedClassLevel as ClassKey
  );

  const SUBJECT_IMAGE_MAP: Record<string, string> = {
    eng: "/subjects/eng-img.png",
    mar: "/subjects/mar-img.png",
    hin: "/subjects/hin-img.png",
    maths: "/subjects/math-img.png",
    science: "/subjects/sci-img.png",
    hist: "/subjects/hist-img.png",
    geo: "/subjects/geo-img.png",
    phy: "/subjects/phy-img.png",
    chem: "/subjects/chem-img.png",
    "maths-1": "/subjects/maths1-img.png",
    "maths-2": "/subjects/maths2-img.png",
    "science-1": "/subjects/sci1-img.png",
    "science-2": "/subjects/sci2-img.png",
    bio: "/subjects/bio-img.png",
    it: "/subjects/it-img.png",
    cs: "/subjects/cs-img.png",
    "pol-sci": "/subjects/pol-sci-img.png",
    psy: "/subjects/psy-img.png",
    soc: "/subjects/soc-img.png",
    acct: "/subjects/acc-img.png",
    eco: "/subjects/eco-img.png",
    ocm: "/subjects/ocm-img.png",
    logic: "/subjects/logic-img.png",
  };
  const DEFAULT_SUBJECT_IMAGE = "/subject-default.png";
  const FULL_NAME_SUBJECTS = [
    "Algebra",
    "Geometry",
    "Physics & Chemistry",
    "Biology & Environment",
    "Pol Science",
    "B. Studies",
    "History",
    "Science",
  ];

  useEffect(() => {
    if (!subjects.length || !data) return;

    const loadStats = async () => {
      const entries = await Promise.all(
        subjects.map(async (s) => {
          const res = await fetch(
            `/api/subject-stats?board=${formattedBoard}&medium=${formattedMedium}&classKey=${formattedClassLevel}&subjectSlug=${s.slug}`
          );

          const stats = await res.json();
          return [s.slug, stats];
        })
      );

      setSubjectStats(Object.fromEntries(entries));
    };

    loadStats();
  }, [subjects, data]);

  const subjectsData: SubjectData[] = subjects.map((subject, index) => {
    const subjectSlug = subject.slug.toLowerCase();
    const stats = subjectStats[subject.slug] ?? {
      chapterCount: 0,
      questionCount: 0,
    };

    return {
      id:
        `${formattedBoard?.slice(0, 2)}-${formattedMedium?.slice(
          0,
          3
        )}-${classToSlug(data?.classLevel)}-${subject.code}` || "",

      imgSrc: SUBJECT_IMAGE_MAP[subject.code] ?? DEFAULT_SUBJECT_IMAGE,

      imgAlt: subject.code ?? "subject",

      title: FULL_NAME_SUBJECTS.includes(subject.shortName ?? "")
        ? subject.name ?? subject.shortName ?? "Unknown Subject"
        : subject.shortName ?? subject.name ?? "Unknown Subject",

      board: data?.board?.toUpperCase() ?? "",

      medium: data?.medium ? `${data.medium.replace("-", " ")} Medium` : "",

      chapterCount: stats.chapterCount,
      questionCount: stats.questionCount,

      classLevel: data?.classLevel?.replace("-", " ") ?? "",

      // details: [
      //   `${Array.isArray(subject)
      //     ? subject.chapters.length
      //     : subject.chapters ?? 0} Chapters`,
      //   `${Array.isArray(subject.questions)
      //     ? subject.questions.length
      //     : subject.questions ?? 0} Questions`,
      // ],

      link: `./courses/${formattedBoard}/${formattedMedium}-medium/class-${formattedClassLevel}/${subjectSlug}`,
    };
  });

  console.log(subjectsData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/account/me", {
          headers: {
            "x-user-uid": user.uid,
          },
        });

        if (!res.ok) throw new Error("Failed to load user");

        const data = await res.json();

        setData({
          firebaseUid: data.firebaseUid ?? "",
          name: data.name ?? "",
          phone: data.phone ?? "",
          gender: data.gender ?? "",
          role: data.role ?? "",
          board: data.board ?? "",
          medium: data.medium ?? "",
          classLevel: data.classLevel ?? "",
          userTier: data.userTier ?? "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!data?.firebaseUid) return;

    const loadSaved = async () => {
      const res = await fetch(`/api/saved-subjects?userId=${data.firebaseUid}`);

      const saved = await res.json();

      setSavedSubjectIds(saved.map((s: any) => s.subjectId));
    };

    loadSaved();
  }, [data?.firebaseUid]);

  const toggleBookmark = async (e: React.MouseEvent, subject: SubjectData) => {
    e.preventDefault();
    e.stopPropagation();

    const isSaved = savedSubjectIds.includes(subject.id);

    // ✅ Optimistic UI update
    setSavedSubjectIds((prev) =>
      isSaved ? prev.filter((id) => id !== subject.id) : [...prev, subject.id]
    );

    try {
      await fetch("/api/saved-subjects", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: data?.firebaseUid,
          subjectId: subject.id,
          subjectData: subject, // 🔥 FULL OBJECT
        }),
      });
    } catch (err) {
      // rollback
      setSavedSubjectIds((prev) =>
        isSaved ? [...prev, subject.id] : prev.filter((id) => id !== subject.id)
      );
    }
  };

  const userTier = data?.userTier
    ? data.userTier.charAt(0).toUpperCase() + data.userTier.slice(1)
    : "";

  const tierColors = {
    Free: "bg-gray-100 text-gray-700",
    Plus: "bg-blue-100 text-blue-700",
    "Pro+": "bg-purple-100 text-purple-700",
  };

  return (
    <section className="border border-[rgba(0,0,0,0.08)] place-content-center items-center bg-white rounded-2xl flex flex-[1_0_0] flex-col gap-14 h-min overflow-hidden py-16 px-8 pb-8 relative w-px">
      <div className="flex place-content-center items-center flex-none flex-col gap-14 h-min max-w-[1200px] overflow-hidden p-0 relative w-full">
        <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-visible p-0 relative w-full">
          <div className="flex place-content-center items-center flex-none flex-row gap-2 h-min overflow-hidden p-0 relative w-min">
            <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
              <h4 className="text-2xl text-[#193625] tracking-tight">
                Hi{data?.name && `, ${data.name}`}
              </h4>
            </div>
            <div className="flex place-content-center items-center flex-none flex-row gap-1 h-min overflow-hidden p-0 relative w-min">
              <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
                <h4 className="text-2xl text-[#193625] tracking-tight">👋</h4>
              </div>
            </div>
          </div>
          <div className="flex place-content-start items-start flex-none flex-row gap-4 h-min overflow-visible p-0 relative w-min">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] ${
                tierColors[userTier as keyof typeof tierColors]
              }`}
            >
              <Crown className="w-4 h-4" />
              <span className="text-xs font-semibold">{userTier}</span>
            </div>

            <Link
              className="border border-[#f4f4f4] place-content-center justify-start items-center rounded-lg flex flex-none flex-row gap-2 h-min overflow-visible py-2 px-4 relative no-underline w-min"
              href="./courses"
            >
              <div className="flex-none h-5 w-5 relative shrink-0 [image-rendering:pixelated] text-[#191a2066]">
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
                    className="w-full h-full lucide lucide-list-filter-icon lucide-list-filter"
                  >
                    <path d="M2 5h20" />
                    <path d="M6 12h12" />
                    <path d="M9 19h6" />
                  </svg>
                </div>
              </div>
              <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto opacity-60">
                <p className="text-xs text-[#191a20]">Filters</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex place-content-start items-start flex-none flex-col gap-6 h-min overflow-hidden p-0 relative w-full">
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
            <p className="text-sm text-[#191a20]">FEATURED</p>
          </div>
          <div className="flex place-content-center justify-start items-center flex-none flex-col gap-4 h-min overflow-auto p-0 relative w-full">
            <div className="grid flex-none gap-4 auto-rows-min grid-cols-[repeat(1,minmax(50px,1fr))] md:grid-cols-[repeat(2,minmax(50px,1fr))] h-min justify-center p-0 relative w-full">
              {dashboardFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="place-self-start flex-none h-auto relative w-full"
                >
                  <Link
                    className="flex place-content-start justify-between items-start cursor-pointer flex-col h-[313px] overflow-hidden p-6 relative no-underline w-full rounded-3xl opacity-100"
                    href={feature.href}
                  >
                    <div className="absolute inset-0 rounded-[inherit]">
                      <Image
                        decoding="async"
                        width="2912"
                        height="1666"
                        sizes="max((min(max(100vw - 112px, 1px) - 64px, 1200px) - 16px) / 2, 50px)"
                        src={feature.imageSrc}
                        alt={feature.imageAlt}
                        className="block w-full h-full rounded-[inherit] object-center object-cover"
                      />
                    </div>
                    {/* <div className="flex-none h-full absolute left-0 top-0 overflow-visible w-full z-0 bg-[linear-gradient(#0000_0%,#000_120%)] opacity-100"></div> */}
                    <div className="flex flex-row items-center justify-between flex-none h-min overflow-hidden p-0 relative w-full">
                      <div className="flex flex-row items-center justify-center flex-none gap-1.5 h-min w-min overflow-hidden p-3 relative rounded-xl bg-white opacity-100 will-change-transform">
                        <div className="relative w-5 h-5 aspect-square flex-none shrink-0 text-[#191A20] fill-current opacity-100 image-pixelated">
                          <div className="w-full h-full aspect-[inherit]">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="512"
                              height="512"
                              viewBox="0 0 512 512"
                              className="h-5 w-5"
                            >
                              <path
                                d="M0 0 C0.66 0 1.32 0 2 0 C2.13462646 0.91773193 2.13462646 0.91773193 2.27197266 1.85400391 C9.13408279 47.75237695 25.65475774 91.61952695 55 128 C55.45052734 128.56477051 55.90105469 129.12954102 56.36523438 129.71142578 C67.39854296 143.46279396 79.77051088 155.58697501 94 166 C95.04671875 166.76828125 96.0934375 167.5365625 97.171875 168.328125 C123.74924506 187.2364032 153.31760818 199.48534449 185 207 C185 207.66 185 208.32 185 209 C184.35264893 209.17015625 183.70529785 209.3403125 183.03833008 209.515625 C148.8158044 218.59254566 116.61424519 231.37458791 89 254 C88.47631836 254.42216797 87.95263672 254.84433594 87.41308594 255.27929688 C74.22880732 265.9259821 62.37442263 277.65153311 52.27490234 291.28076172 C51.0372902 292.94971322 49.77946181 294.60177553 48.51953125 296.25390625 C22.92720594 330.363455 6.83233034 373.73514065 2 416 C1.34 416 0.68 416 0 416 C-0.13462646 415.08226807 -0.13462646 415.08226807 -0.27197266 414.14599609 C-9.65138438 351.41022975 -38.49059533 290.08058976 -90.23681641 251.32324219 C-91.91269686 250.06551966 -93.57149506 248.7876937 -95.23046875 247.5078125 C-120.70820969 228.22164332 -152.01568617 216.05032291 -183 209 C-183 208.34 -183 207.68 -183 207 C-182.35264893 206.82984375 -181.70529785 206.6596875 -181.03833008 206.484375 C-146.81864141 197.4082068 -114.60970648 184.62803136 -87 162 C-86.47100098 161.57251465 -85.94200195 161.1450293 -85.39697266 160.70458984 C-73.00068343 150.66631063 -61.72905108 139.66999446 -52 127 C-51.5963623 126.48872559 -51.19272461 125.97745117 -50.77685547 125.45068359 C-22.86784215 90.00847111 -5.11794442 44.76291688 0 0 Z "
                                fill="#2196f3"
                                transform="translate(207,16)"
                              ></path>
                              <path
                                d="M0 0 C0.66 0 1.32 0 2 0 C2.20753906 1.22332031 2.41507812 2.44664062 2.62890625 3.70703125 C7.40734628 30.42455766 17.94206447 52.695564 36 73 C36.70898438 73.79921875 37.41796875 74.5984375 38.1484375 75.421875 C56.05372011 94.30930391 80.24321898 104.65642573 105 111 C105 111.66 105 112.32 105 113 C104.19502075 113.2019397 104.19502075 113.2019397 103.3737793 113.40795898 C67.10052163 122.68519412 37.87226054 142.40530475 18.3815918 174.79174805 C9.45708199 190.23586739 4.96605746 206.51684144 2 224 C1.34 224 0.68 224 0 224 C-0.20753906 222.77667969 -0.41507812 221.55335938 -0.62890625 220.29296875 C-5.40734628 193.57544234 -15.94206447 171.304436 -34 151 C-34.70898438 150.20078125 -35.41796875 149.4015625 -36.1484375 148.578125 C-54.05372011 129.69069609 -78.24321898 119.34357427 -103 113 C-103 112.34 -103 111.68 -103 111 C-102.19502075 110.7980603 -102.19502075 110.7980603 -101.3737793 110.59204102 C-76.78104321 104.30221182 -56.96877509 93.86966638 -38 77 C-37.34386719 76.42894531 -36.68773437 75.85789062 -36.01171875 75.26953125 C-15.00285497 55.76488206 -4.66569906 27.50154291 0 0 Z "
                                fill="#7e57c2"
                                transform="translate(383,272)"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start flex-none shrink-0 outline-none relative w-auto h-auto whitespace-pre opacity-100 transform-none">
                          <p className="text-[#191a20] font-semibold text-sm">
                            AI
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-hidden p-0 relative w-full"></div>
                    <div className="flex place-content-start items-start flex-none flex-col gap-2 h-min max-w-lg overflow-hidden p-0 relative w-full">
                      <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word origin-center">
                        <h4 className="text-xl lg:text-2xl text-[#193625] tracking-tight">
                          {feature.title}
                        </h4>
                      </div>
                      <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word origin-center">
                        <p className="text-xs sm:text-sm text-[#5e6b64]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {!loading && data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <SelectField
              label="Board"
              value={data.board}
              options={Object.keys(boardMediumMap)}
              onChange={(v) =>
                setData({
                  ...data,
                  board: v,
                  medium: "",
                  classLevel: "",
                })
              }
            />

            <SelectField
              label="Medium"
              value={data.medium}
              options={
                data.board
                  ? boardMediumMap[data.board as keyof typeof boardMediumMap]
                  : []
              }
              onChange={(v) => setData({ ...data, medium: v })}
            />

            <SelectField
              label="Class"
              value={data.classLevel}
              options={
                data.board
                  ? boardClassMap[data.board as keyof typeof boardClassMap]
                  : []
              }
              onChange={(v) => setData({ ...data, classLevel: v })}
            />
          </div>
        )}

        <div className="flex place-content-start items-start flex-none flex-col gap-6 h-min overflow-hidden p-0 relative w-full">
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
            <p className="text-sm text-[#191a20]">COURSES & RESOURCES</p>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Subjects</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {subjectsData.map((item) => {
                const isSaved = savedSubjectIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="self-start flex-none h-full relative"
                  >
                    <Link
                      href={item.link}
                      className="flex flex-col items-start justify-start gap-0 cursor-pointer overflow-hidden relative rounded-xl opacity-100 h-min w-[315px] will-change-transform"
                    >
                      <div className="relative w-full h-full aspect-4/3 flex-none overflow-hidden rounded-xl opacity-100 will-change-transform">
                        <div className="absolute top-0 left-1/2 w-full flex flex-col items-start justify-end gap-2 p-4 aspect-4/3 -translate-x-1/2 origin-center flex-none overflow-visible rounded-[3.08221%/4.85451%]">
                          <div className="absolute inset-0 overflow-hidden">
                            <Image
                              src={item.imgSrc}
                              alt=""
                              fill
                              className="object-cover blur-lg scale-110 opacity-40"
                            />
                            <Image
                              src={item.imgSrc}
                              alt={item.imgAlt}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="absolute left-1/2 bottom-3 w-[92%] flex flex-row items-center justify-between flex-none h-min overflow-visible p-0 -translate-x-1/2 opacity-100">
                          <div className="relative flex flex-row items-center justify-center flex-none gap-1 h-[26px] w-min overflow-visible p-0">
                            <div className="relative flex flex-row items-center justify-start flex-none gap-0 h-min w-min overflow-visible px-3 py-1 bg-white rounded opacity-100">
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre opacity-100 transform-none w-auto h-auto">
                                <p className="text-xs text-black">
                                  {item.board}
                                </p>
                              </div>
                            </div>
                            <div className="relative flex flex-row items-center justify-start flex-none gap-0 h-min w-min overflow-visible px-3 py-1 bg-white rounded opacity-100">
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre opacity-100 transform-none w-auto h-auto">
                                <p className="text-xs text-black">
                                  {item.medium}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative flex flex-row items-center justify-center flex-none gap-1 h-min w-min overflow-visible bg-white rounded px-1.5 py-1">
                            <div className="relative flex-none w-auto h-auto">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleBookmark(e, item);
                                }}
                                className="relative flex flex-row flex-nowrap items-center justify-center gap-1.5 h-min w-min overflow-visible p-0 cursor-pointer no-underline"
                              >
                                <Bookmark
                                  className={`w-5 h-5 ${
                                    isSaved
                                      ? "fill-black text-black"
                                      : "text-black"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col items-start justify-start flex-none gap-3 h-min w-full overflow-visible pt-4 px-0 no-underline">
                        <div className="relative flex flex-col items-start justify-start flex-none gap-2 h-min w-full overflow-visible p-0">
                          <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none opacity-100 w-auto h-auto">
                            <p className="text-lg font-medium text-black">
                              {item.title} - {item.classLevel}
                            </p>
                          </div>
                          <div className="relative flex flex-row items-center justify-start flex-none gap-2.5 h-min w-min overflow-visible p-0 opacity-80">
                            <div className="relative flex flex-row items-center justify-start flex-none gap-1 h-min w-min overflow-visible p-0">
                              <div className="relative flex-none shrink-0 w-4 h-4 text-black fill-current opacity-100 image-pixelated">
                                <div className="w-full h-full aspect-[inherit]">
                                  <NotepadText className="w-3.5 h-3.5" />
                                </div>
                              </div>
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none opacity-100 w-auto h-auto">
                                <p className="text-sm text-black">
                                  {item.chapterCount} Chapters
                                </p>
                              </div>
                            </div>
                            <div className="relative flex-none w-1.5 h-1.5 aspect-square rounded-full bg-[#191A20] opacity-100"></div>
                            <div className="relative flex flex-row items-center justify-start flex-none gap-1 h-min w-min overflow-visible p-0">
                              <div className="relative flex-none shrink-0 w-4 h-4 text-black fill-current opacity-100 image-pixelated">
                                <div className="w-full h-full aspect-[inherit]">
                                  <BookOpen className="w-[15px] h-[15px]" />
                                </div>
                              </div>
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none opacity-100 w-auto h-auto">
                                <p className="text-sm text-black">
                                  {item.questionCount.toLocaleString()}{" "}
                                  Questions
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none h-auto relative w-full">
        <div className="flex place-content-center items-center flex-col gap-2.5 h-min overflow-hidden p-0 relative w-full">
          <div className="flex place-content-center justify-between items-center flex-none flex-row h-min max-w-[1200px] overflow-visible p-0 relative w-full">
            <div className="relative w-auto h-auto">
              <Link
                aria-label="Logo"
                className="flex flex-row place-content-center items-center gap-2 w-min h-min p-0 no-underline relative overflow-hidden"
                href="./#hero"
              >
                <div className="relative w-7 h-7">
                  {/* svg */}
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    className="select-none w-full h-full inline-block shrink-0 fill-[#193625] text-[#193625]"
                  >
                    <g
                      transform="translate(0,100) scale(0.1,-0.1)"
                      fill="#193625"
                      stroke="none"
                    >
                      <path d="M626 894 l-49 -75 121 -122 121 -121 75 50 75 50 -147 147 -147 146 -49 -75z" />
                      <path d="M509 743 c-50 -26 -135 -43 -215 -43 l-50 0 -23 -97 c-13 -54 -52 -186 -87 -294 -35 -108 -64 -201 -64 -205 0 -5 81 72 180 171 113 112 178 185 175 194 -9 24 23 61 53 61 35 0 52 -16 52 -50 0 -33 -17 -50 -50 -50 -19 0 -66 -40 -205 -180 -99 -99 -176 -180 -171 -180 4 0 96 29 204 63 109 35 241 75 295 87 l97 24 0 50 c0 80 18 166 45 221 l25 50 -103 103 c-56 56 -104 101 -107 101 -3 -1 -26 -13 -51 -26z" />
                    </g>
                  </svg>
                </div>
                <div className="relative w-auto h-auto text-[#193625]">
                  <p className="text-[#193625] text-2xl">Sylabus</p>
                </div>
              </Link>
            </div>
            <div className="flex place-content-center items-center flex-none flex-row gap-3 h-min overflow-hidden p-0 relative w-min">
              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                <p className="text-xs text-[#193625]">
                  <Link
                    className="text-xs text-[#193625]"
                    href="./privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                <p className="text-xs text-[#193625]">
                  <Link
                    className="text-xs text-[#193625]"
                    href="./terms-of-service"
                  >
                    Terms of Service{" "}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

type SelectProps = {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
};

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1 relative">
    <span className="text-sm opacity-60">{label}</span>

    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
        w-full p-4 pr-12 rounded-lg bg-white
        shadow-[inset_0_0_0_1px_rgba(25,26,32,0.2)]
        outline-none text-[16px]
        focus:ring-2 focus:ring-[#193625]/20
        appearance-none
      "
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {/* Custom Chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#193625]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  </div>
);

const normalizeMedium = (value?: string) => {
  if (!value) return null;

  return value.toLowerCase().trim().replace(/\s+/g, "-") as
    | "english"
    | "marathi"
    | "hindi"
    | "semi-english"
    | "all";
};

const normalizeClassLevel = (value?: string) => {
  if (!value) return null;

  return value
    .toLowerCase()
    .trim()
    .replace(/th|st|nd|rd/g, "") // remove 12th → 12
    .replace(/\s+/g, "-") as
    | "8"
    | "9"
    | "10"
    | "11-arts"
    | "11-commerce"
    | "11-science"
    | "11-humanities"
    | "12-arts"
    | "12-commerce"
    | "12-science"
    | "12-humanities";
};

export const classToSlug = (value?: string): string => {
  if (!value) return "";

  const v = value.toLowerCase().trim();

  // extract class number (8, 9, 10, 11, 12)
  const match = v.match(/\d+/);
  if (!match) return "";

  const cls = match[0];

  if (v.includes("science")) return `${cls}-sci`;
  if (v.includes("commerce")) return `${cls}-com`;
  if (v.includes("humanities") || v.includes("arts")) return `${cls}-hum`;

  // plain classes (8, 9, 10)
  return cls;
};
