"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState("--:--");

  // Live local time, Cairo — placeholder until mount avoids any SSR mismatch
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Cairo",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#222222]/15 p-4 text-xs uppercase tracking-widest text-[#222222]/60">
      <span>Based in Egypt</span>
      <span>{time} · Cairo</span>
      <div className="flex gap-6">
        <Link
          href="https://github.com/yourhandle"
          target="_blank"
          rel="noreferrer"
          className=" hover:text-[#222222]"
        >
          GitHub
        </Link>
        <a
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-[#222222]"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Footer;
