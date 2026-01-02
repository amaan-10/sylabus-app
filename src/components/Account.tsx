"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LogOut } from "lucide-react";

type User = {
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  role?: string;
  board?: string;
  medium?: string;
  classLevel?: string;
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

type UserForm = {
  name: string;
  phone: string;
  gender: string;
  role: string;
  board: string;
  medium: string;
  classLevel: string;
};

const Account = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    phone: "",
    gender: "",
    role: "",
    board: "",
    medium: "",
    classLevel: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

        setForm({
          name: data.name ?? "",
          phone: data.phone ?? "",
          gender: data.gender ?? "",
          role: data.role ?? "",
          board: data.board ?? "",
          medium: data.medium ?? "",
          classLevel: data.classLevel ?? "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    setSaving(true);

    const user = auth.currentUser;

    if (!user) {
      alert("Not authenticated");
      return;
    }

    const idToken = await user.getIdToken();

    await fetch("/api/profile/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(form),
    });

    setSaving(false);
  };

  const formatIndianPhone = (phone?: string) => {
    if (!phone) return "—";

    // Remove spaces
    const clean = phone.replace(/\s+/g, "");

    // Handle +91 prefix
    if (clean.startsWith("+91")) {
      const num = clean.slice(3);
      return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
    }

    // Handle 10-digit number
    if (clean.length === 10) {
      return `${clean.slice(0, 5)} ${clean.slice(5)}`;
    }

    // Fallback
    return phone;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        Loading account…
      </div>
    );
  }

  return (
    <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-white md:border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_8px_120px] md:p-[56px_32px_32px] will-change-transform">
      <div className="relative flex flex-col flex-nowrap flex-[1_0_0] items-center content-center justify-start gap-14 w-px max-w-[1200px] h-min overflow-hidden p-0">
        <div className="relative flex flex-row flex-nowrap flex-none items-start content-start justify-between w-full h-min overflow-hidden p-0">
          <div className="relative flex flex-col justify-start flex-none shrink-0 w-auto h-auto whitespace-pre outline-none">
            <h4 className="text-2xl text-[#193625] tracking-tight">Account</h4>
          </div>
        </div>
        <div className="relative flex flex-col flex-nowrap flex-none items-end content-end justify-center gap-2.5 w-full h-min overflow-hidden p-0">
          <section className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-12 w-full h-min overflow-hidden md:px-4 py-8">
            <div className="relative flex flex-row flex-nowrap flex-none items-center content-center justify-center gap-4 w-full max-w-[400px] h-min p-4 overflow-visible rounded-2xl bg-[#ffffff] border border-[#d9d9d9] shadow-[0_24px_64px_#26214a1a]">
              <div className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-2.5 w-min h-min p-2 overflow-hidden rounded-lg bg-[#fff8f4] will-change-transform">
                <div className="flex-none w-8 h-8 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    color="var(--token-5c28b080-63a4-416d-b638-2f3867ab529e, rgb(255, 102, 37))"
                    className="w-full h-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="relative flex flex-col flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-0 w-px h-min overflow-hidden p-0">
                <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                  <p className="text-base font-semibold text-[#193625] tracking-tight">
                    {form.name}
                  </p>
                </div>
                <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word opacity-50 outline-none">
                  <p className="text-sm">{formatIndianPhone(form.phone)}</p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-4 w-full max-w-[400px] h-min overflow-hidden p-0">
              <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                <p className="text-base text-[#193625] tracking-tight">
                  Account info
                </p>
              </div>
              <div className="flex-none w-full h-auto relative">
                <div className="relative w-full h-full flex justify-center items-center">
                  <form
                    onSubmit={handleSave}
                    className="relative flex flex-col w-full h-auto gap-4"
                  >
                    {/* Email (still read-only) */}
                    {/* <Input label="Email" value={form.email} disabled /> */}

                    {/* Name */}
                    <Input
                      label="Full Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />

                    {/* Gender */}
                    <Select
                      label="Gender"
                      value={form.gender}
                      options={["Male", "Female", "Other"]}
                      onChange={(v) => setForm({ ...form, gender: v })}
                    />

                    {/* Role */}
                    <Select
                      label="Role"
                      value={form.role}
                      options={["Teacher", "Student"]}
                      onChange={(v) => setForm({ ...form, role: v })}
                    />

                    {/* Board */}
                    <Select
                      label="Board"
                      value={form.board}
                      options={Object.keys(boardMediumMap)}
                      onChange={(v) =>
                        setForm({
                          ...form,
                          board: v,
                          medium: "",
                          classLevel: "",
                        })
                      }
                    />

                    {/* Medium (depends on board) */}
                    <Select
                      label="Medium"
                      value={form.medium}
                      options={
                        form.board
                          ? boardMediumMap[
                              form.board as keyof typeof boardMediumMap
                            ]
                          : []
                      }
                      onChange={(v) => setForm({ ...form, medium: v })}
                    />

                    {/* Class (depends on board) */}
                    <Select
                      label="Class"
                      value={form.classLevel}
                      options={
                        form.board
                          ? boardClassMap[
                              form.board as keyof typeof boardClassMap
                            ]
                          : []
                      }
                      onChange={(v) => setForm({ ...form, classLevel: v })}
                    />

                    {/* SAVE */}
                    <button
                      type="submit"
                      className="appearance-none w-full p-4 rounded-lg bg-[#191a20] text-white cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-4 w-full max-w-[400px] h-min overflow-hidden pt-12 border-t border-[#d9d9d9]">
              <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                <p className="text-base text-[#193625] tracking-tight">
                  Change password
                </p>
              </div>
              <div className="flex-none w-full h-auto relative">
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <form
                    method="POST"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      color:
                        "var(--token-8162f168-ed62-49f3-b338-425fedfa1e6f, rgb(245, 245, 245))",
                      gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value=""
                        style={{
                          appearance: "none",
                          width: "100%",
                          height: "auto",
                          outline: "none",
                          border: "none",
                          padding: 16,
                          borderRadius: 8,
                          fontSize: 16,
                          fontFamily:
                            'Lexend, "Lexend Placeholder", sans-serif',
                          fontStyle: "normal",
                          fontWeight: 400,
                          letterSpacing: 0,
                          lineHeight: "1em",
                          background: "rgb(255, 255, 255)",
                          color:
                            "var(--token-3991cae2-fa00-4648-803b-711c24c1718d, rgb(25, 26, 32))",
                          boxShadow:
                            "rgba(25, 26, 32, 0.2) 0px 0px 0px 1px inset",
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "block",
                          justifyContent: "flex-end",
                          position: "relative",
                        }}
                      >
                        <div style={{ position: "relative", display: "block" }}>
                          <input
                            type="submit"
                            value="Send Reset Email"
                            style={{
                              appearance: "none",
                              width: "100%",
                              height: "100%",
                              outline: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 16,
                              borderRadius: 8,
                              fontSize: 16,
                              fontFamily:
                                'Lexend, "Lexend Placeholder", sans-serif',
                              fontStyle: "normal",
                              fontWeight: 400,
                              letterSpacing: 0,
                              lineHeight: "1em",
                              background:
                                "var(--token-3991cae2-fa00-4648-803b-711c24c1718d, rgb(25, 26, 32))",
                              color:
                                "var(--token-8162f168-ed62-49f3-b338-425fedfa1e6f, rgb(245, 245, 245))",
                              zIndex: 1,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          opacity: 0,
                          height: 0,
                          transform: "scale(0)",
                          willChange: "transform",
                        }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <div
                            style={{
                              padding: "1rem",
                              color: "rgb(255, 255, 255)",
                              fontSize: 16,
                              backgroundColor: "rgb(0, 200, 83)",
                              borderRadius: 8,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        style={{
                          opacity: 0,
                          height: 0,
                          transform: "scale(0)",
                          willChange: "transform",
                        }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <div
                            style={{
                              padding: "1rem",
                              color: "rgb(255, 255, 255)",
                              fontSize: 16,
                              backgroundColor: "rgb(224, 36, 36)",
                              borderRadius: 8,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
          </section>
          <div className="relative flex flex-row flex-nowrap flex-none items-center content-center justify-center gap-0 w-full h-min overflow-visible p-0 rounded-xl bg-white">
            <div className="flex-none w-auto h-auto relative">
              <Link
                href="./logout"
                className="relative flex flex-row flex-nowrap items-center content-center justify-center gap-2 cursor-pointer w-min h-min overflow-hidden px-3 py-2 no-underline rounded-sm bg-[rgb(245,223,223)] opacity-100 will-change-transform"
              >
                <div className="relative flex flex-row gap-2 justify-start flex-none shrink-0 w-auto h-auto whitespace-pre outline-none opacity-100">
                  <p className="text-base text-[#a60303] tracking-tight cursor-pointer">
                    Logout
                  </p>
                  <LogOut className="h-5 w-5 pt-1 text-[#a60303]" />
                </div>
              </Link>
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
                  <div className="relative w-5 md:w-7 h-5 md:h-7 mb-[7px] md:mb-0">
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
                    <p className="text-[#193625] text-base md:text-2xl">
                      Sylabus
                    </p>
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
      </div>
    </section>
  );
};

export default Account;

/* ---------- Reusable Input ---------- */

const Input = ({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm opacity-60">{label}</span>
    <input
      disabled={disabled}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full p-4 rounded-lg bg-white shadow-[inset_0_0_0_1px_rgba(25,26,32,0.2)] outline-none"
    />
  </div>
);

const Select = ({
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
