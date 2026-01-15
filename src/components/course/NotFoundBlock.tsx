"use client";

import Link from "next/link";

export const NotFoundBlock: React.FC<{
  title: string;
  message: string;
  href: string;
  cta: string;
}> = ({ title, message, href, cta }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="max-w-md text-center space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600">{message}</p>
      <Link
        href={href}
        className="inline-flex mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800"
      >
        {cta}
      </Link>
    </div>
  </div>
);
