"use client";
import Link from "next/link";
import React, { useState } from "react";
import { wordChild, wordParent } from "../animations";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Sylabus?",
      answer: [
        "Sylabus is an intelligent question paper generation platform that helps institutes and individuals create customized or AI-generated question papers within seconds. It automates the entire paper-setting process based on syllabus, marks distribution, difficulty level, and exam patterns.",
      ],
    },
    {
      question: "How does the AI question paper generation work?",
      answer: [
        "Sylabus uses artificial intelligence to analyze the uploaded syllabus or selected chapters and automatically generate well-structured question papers.",
        "It considers factors like:",
        "Exam pattern and marks distribution",
        "Difficulty levels (Easy, Medium, Hard)",
        "Question types (MCQ, Short Answer, Long Answer, Case-based)",
        "Time duration and total marks",
        "This ensures balanced and exam-ready papers in seconds.",
      ],
    },
    {
      question: "Can I create fully custom question papers without AI?",
      answer: [
        "Yes, Sylabus also provides a Custom Mode where teachers can manually select questions from the question bank.",
        "You can:",
        "Choose specific chapters",
        "Set exact marks per question",
        "Rearrange questions using drag-and-drop",
        "Save drafts and export final papers as PDF",
        "This gives complete control over paper creation.",
      ],
    },
    {
      question: "Is Sylabus suitable for coaching classes and schools?",
      answer: [
        "Absolutely. Sylabus is designed for coaching institutes, schools, colleges, and individual educators.",
        "Institutes can generate multiple sets of question papers, maintain question banks, and standardize exam patterns while saving hours of manual work.",
      ],
    },
    {
      question: "Can Sylabus generate multiple question paper sets?",
      answer: [
        "Yes, you can generate multiple randomized sets of question papers to prevent cheating and maintain fairness during examinations.",
        "Each set maintains the same difficulty level and marks distribution.",
      ],
    },
    {
      question: "Does Sylabus support syllabus-based question generation?",
      answer: [
        "Yes, you can upload or define your syllabus, and the AI will generate questions strictly aligned with the provided curriculum.",
        "This ensures complete academic relevance and structured assessment.",
      ],
    },
    {
      question: "Is my institute’s data secure?",
      answer: [
        "Yes, Sylabus follows secure authentication and encrypted data storage practices to protect your question bank, syllabus files, and exam papers.",
        "Your institutional data remains private and accessible only to authorized users.",
      ],
    },
    {
      question: "Can I export the generated question papers?",
      answer: [
        "Yes, Sylabus allows exporting question papers in PDF format for printing or digital distribution.",
        "You can also save drafts and reuse templates for future exams.",
      ],
    },
    {
      question: "Who can use Sylabus?",
      answer: [
        "Sylabus is ideal for:",
        "Coaching Institutes",
        "School Teachers",
        "College Professors",
        "Individual Educators",
        "EdTech Platforms",
        "Anyone who wants to automate and standardize exam creation efficiently.",
      ],
    },
  ];

  const [openStates, setOpenStates] = useState<boolean[]>(
    faqData.map((_, i) => i === 0),
  );

  const toggle = (index: number) => {
    setOpenStates((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  const [parent] = useAutoAnimate({
    duration: 600,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  });

  return (
    <div
      className="flex flex-col flex-none place-content-center items-center gap-16 lg:gap-24 w-full max-w-7xl h-min px-4 md:px-8 lg:px-12 relative overflow-hidden font-poppins"
      id="faq"
    >
      <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[568px] md:max-w-[600px] h-min p-0 relative overflow-hidden">
        <div className="flex-none w-auto h-auto relative">
          <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[rgb(240,244,243)]">
            <div className="flex-none w-auto h-auto relative">
              <p className="text-sm text-[#5e6b64]">FAQ</p>
            </div>
          </div>
        </div>
        <div className="flex-none w-full h-auto relative">
          <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] tracking-tighter text-center">
            Frequently asked questions
          </h1>
        </div>
        <div className="flex-none w-full max-w-[620px] h-auto relative">
          <p className="text-[#5e6b64] text-center">
            Here are the top questions our clients ask before getting started.
          </p>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center flex-none flex-nowrap gap-5 h-min w-full max-w-[810px] overflow-hidden p-0 relative"
        data-framer-name="Wrapper"
      >
        {faqData.map((faq, index) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 40,
              delay: 0.4,
              duration: 0.3,
            }}
            viewport={{ once: true, amount: 0.2 }}
            key={index}
            onClick={() => toggle(index)}
            className="cursor-pointer w-full max-w-[810px] overflow-hidden"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-medium text-[#13261b]">
                  {faq.question}
                </h3>
                <div className="bg-[#f0f4f3] z-1 flex flex-row flex-none place-content-center items-center gap-2.5 w-min h-min p-2 relative overflow-visible rounded-full">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    initial={false}
                    animate={{ rotate: openStates[index] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#616161"
                  >
                    <polyline
                      points="6 9 12 15 18 9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
              </div>

              <div ref={parent}>
                {openStates[index] && (
                  <div className="text-[#5e6b64] text-base font-normal pt-5">
                    <p>{faq.answer.slice(0, 1)}</p>
                    {faq.answer.length > 1 && (
                      <>
                        <ul className="list-disc pl-10 space-y-1 mt-2">
                          {faq.answer.slice(1, -1).map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>

                        <p className="mt-3">
                          {faq.answer[faq.answer.length - 1]}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
