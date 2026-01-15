"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

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

const anim = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function CompleteProfile() {
  const router = useRouter();
  const auth = getAuth();

  const TOTAL_STEPS = 5;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    role: "",
    board: "",
    medium: "",
    classLevel: "",
    gender: "",
  });

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Not authenticated");
      return;
    }

    // ✅ THIS IS THE IMPORTANT PART
    const idToken = await user.getIdToken();

    const res = await fetch("/api/profile/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`, // ✅ REQUIRED
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.replace("/dashboard");
    } else {
      alert("Failed to save profile");
    }
  };

  const steps = [
    { id: 1, title: "Let’s get to know you 👋" },
    { id: 2, title: "Your teaching role 🎓" },
    { id: 3, title: "Class & Medium 📚" },
    { id: 4, title: "All set! 🚀" },
  ];

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-white via-slate-100 to-slate-200 px-4 font-poppins">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 1 - ROLE */}
          {step === 1 && (
            <motion.div key="role" {...anim} className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#193625] tracking-tight">
                Who are you? 👋
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Teacher", emoji: "👨‍🏫" },
                  { label: "Student", emoji: "🎒" },
                ].map((r) => (
                  <button
                    key={r.label}
                    onClick={() => {
                      setForm({ ...form, role: r.label });
                      next();
                    }}
                    className="
                      group rounded-2xl border border-slate-300
                      p-6 text-center transition
                      hover:-translate-y-1 hover:shadow-lg
                      hover:border-[#13261b]
                      active:scale-[0.98] cursor-pointer
                    "
                  >
                    <div className="text-4xl transition group-hover:scale-110">
                      {r.emoji}
                    </div>
                    <p className="mt-3 font-medium text-[#193625]">{r.label}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 - NAME + GENDER */}
          {step === 2 && (
            <motion.div key="name" {...anim} className="space-y-6">
              <Back onClick={back} />

              <h2 className="text-2xl font-semibold text-[#193625] tracking-tight">
                What should we call you? ✨
              </h2>

              {/* NAME */}
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Your name</p>
                <input
                  autoFocus
                  placeholder="Type your name here"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 bg-white text-sm outline-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] focus:border-[#13261b] focus:ring-4 focus:ring-[#13261b]/10 transition"
                />
              </div>

              {/* GENDER */}
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">
                  Gender <span className="text-slate-400">(optional)</span>
                </p>

                <div className="flex gap-3">
                  {[
                    { label: "Male" },
                    { label: "Female" },
                    { label: "Other" },
                  ].map((g) => (
                    <button
                      key={g.label}
                      type="button"
                      onClick={() => setForm({ ...form, gender: g.label })}
                      className={`flex-1 h-12 rounded-2xl border flex items-center justify-center gap-2 text-sm font-medium transition cursor-pointer
                        ${
                          form.gender === g.label
                            ? "border-[#13261b] bg-[#13261b]/5"
                            : "border-slate-300 hover:border-[#13261b]/40"
                        }
                      `}
                    >
                      {/* <span className="text-lg">{g.emoji}</span> */}
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTINUE */}
              <button
                onClick={next}
                disabled={!form.name.trim()}
                className="w-full h-11 rounded-full bg-[#13261b] text-white font-medium hover:brightness-110 disabled:opacity-40 transition cursor-pointer"
              >
                Continue →
              </button>
            </motion.div>
          )}

          {/* STEP 3 - BOARD & MEDIUM */}
          {step === 3 && (
            <motion.div key="board-medium" {...anim} className="space-y-6">
              <Back onClick={back} />
              <h2 className="text-2xl font-semibold text-[#193625] tracking-tight">
                Select Board 🏫
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {Object.keys(boardMediumMap).map((b) => (
                  <Tile
                    key={b}
                    board={true}
                    label={b}
                    selected={form.board === b}
                    onClick={() => {
                      setForm({
                        ...form,
                        board: b,
                        medium: "",
                        classLevel: "",
                      });
                    }}
                  />
                ))}
              </div>

              <h2 className="pt-4 text-2xl font-semibold text-[#193625] tracking-tight">
                Choose Medium 📘
              </h2>

              {form.board ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {boardMediumMap[
                    form.board as keyof typeof boardMediumMap
                  ].map((m) => (
                    <Tile
                      key={m}
                      label={m}
                      onClick={() => {
                        setForm({ ...form, medium: m });
                        next();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-400">
                  Select a board to see available mediums
                </p>
              )}
            </motion.div>
          )}

          {/* STEP 4 – CLASS */}
          {step === 4 && (
            <motion.div key="class" {...anim} className="space-y-6">
              <Back onClick={back} />
              <h2 className="text-2xl font-semibold text-[#193625] tracking-tight">
                Select Class 📚
              </h2>

              <ClassDropdown
                value={form.classLevel}
                options={
                  boardClassMap[form.board as keyof typeof boardClassMap]
                }
                onSelect={(c) => {
                  setForm({ ...form, classLevel: c });
                  next();
                }}
              />
            </motion.div>
          )}

          {/* STEP 5 - DONE */}
          {step === 5 && (
            <motion.div key="done" {...anim} className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🎉</div>

              <h2 className="text-xl font-semibold text-[#193625]">
                You're all set, {form.name}!
              </h2>

              <p className="text-sm text-slate-500">
                Let's create your first question paper 🚀
              </p>

              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="w-full h-11 rounded-full bg-[#13261b] text-white cursor-pointer"
              >
                Go to Dashboard →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* PROGRESS DOTS */}
        <div className="pt-8 w-full flex items-center justify-center">
          {/* <span className="text-xs text-slate-500">
            Step {step} of {TOTAL_STEPS}
          </span> */}

          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
              const isActive = i + 1 === step;
              const isCompleted = i + 1 < step;

              return (
                <motion.span
                  key={i}
                  layout
                  className={`relative rounded-full transition
                    ${
                      isActive
                        ? "w-2.5 h-2.5 bg-[#13261b]"
                        : isCompleted
                        ? "w-1.5 h-1.5 bg-[#13261b]/60"
                        : "w-1.5 h-1.5 bg-slate-300"
                    }
                  `}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- HELPERS -------------------- */
const Tile = ({
  label,
  onClick,
  board,
  selected = false,
}: {
  label: string;
  onClick: () => void;
  board?: boolean;
  selected?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`group w-full sm:w-40 rounded-2xl ${
      selected
        ? "border-[#13261b] bg-[#13261b]/5 shadow-sm"
        : "border-slate-300 bg-white hover:border-[#13261b]/50"
    } bg-white border shadow-sm hover:shadow-md transition overflow-hidden hover:-translate-y-1 active:scale-[0.97] cursor-pointer`}
  >
    <div className="flex flex-col items-center p-4 space-y-3">
      {board && (
        <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition">
          {label ? (
            <Image
              width={36}
              height={36}
              src={`/boards/${label.toLocaleLowerCase()}.jpg`}
              alt={label}
              className="h-full w-full object-contain"
            />
          ) : (
            ""
          )}
        </div>
      )}

      <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition">
        {label}
      </p>
    </div>
  </button>
);

const ClassDropdown = ({
  value,
  options,
  onSelect,
}: {
  value: string;
  options: string[];
  onSelect: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rect = buttonRef.current?.getBoundingClientRect();

  if (!mounted) return null;

  return (
    <>
      {/* Trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full h-12 px-4 rounded-xl
          bg-white border border-slate-300
          text-left text-sm font-medium
          flex items-center justify-between
          hover:border-[#13261b]
          focus:outline-none focus:ring-4 focus:ring-[#13261b]/10
          transition
        "
      >
        <span className={value ? "text-[#193625]" : "text-slate-400"}>
          {value || "Select your class"}
        </span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      {/* Portal Dropdown */}
      {open &&
        rect &&
        createPortal(
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="
                fixed z-9999
                rounded-xl bg-white
                border border-slate-200
                shadow-2xl
                overflow-hidden
              "
              style={{
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width,
              }}
            >
              <div className="max-h-44 overflow-y-auto">
                {options.map((opt, key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onSelect(opt);
                      setOpen(false);
                    }}
                    className={`w-[96%] px-4 py-3 ${key === 0 && "mt-2"} ${
                      key === options.length - 1 && "mb-2"
                    } mx-2 rounded-lg text-sm text-left hover:bg-[#13261b]/5 transition cursor-pointer`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.ul>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

const Back = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-sm text-slate-400 hover:text-slate-600 transition cursor-pointer"
  >
    ← Back
  </button>
);
