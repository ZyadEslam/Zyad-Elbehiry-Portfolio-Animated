"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Swap these for the real details.
const CONTACT_EMAIL = "hello@marwanahmed.dev";
const CONTACT_PHONE = "+20 100 123 4567";

const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const { contextSafe } = useGSAP(
    () => {
      // Scroll reveal: left column content staggers up, form fades/slides
      // in from the right — subtle, premium, plays once.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from("[data-reveal='left']", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      }).from(
        "[data-reveal='form']",
        { x: 24, opacity: 0, duration: 0.8 },
        "<0.1"
      );

      gsap.set(successRef.current, { autoAlpha: 0 });
    },
    { scope: sectionRef }
  );

  const handleSubmit = () => {
    contextSafe((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Wire this up to your API route / email provider of choice.
      setStatus("sending");

      window.setTimeout(() => {
        setStatus("sent");
        gsap
          .timeline()
          .to(formWrapRef.current, {
            autoAlpha: 0,
            y: -12,
            duration: 0.35,
            ease: "power2.in",
          })
          .fromTo(
            successRef.current,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "<0.1"
          );
      }, 700);
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-dark-bg px-6 py-10 text-white md:px-12 lg:px-20 "
    >
      <div className="flex justify-between py-4">
        <p
          data-reveal="left"
          className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white"
        >
          Contact
        </p>
        <span className="text-zinc-700">(Get In Touch)</span>
      </div>
      <div className="relative grid grid-cols-1 border-y border-white/[0.08] py-10  lg:grid-cols-[50%50%]">
        {/* Left column — intro + contact info */}
        <div className=" py-10 lg:py-0 ">
          <h1
            data-reveal="left"
            className="text-4xl text-background font-normal leading-[1.05] tracking-tight md:text-6xl"
          >
            Have a project in mind?
          </h1>

          <div
            data-reveal="left"
            className="mt-6 text-lg font-medium flex items-center gap-4 text-white"
          >
            <span className="bg-white/10 border font-bold border-zinc-600 rounded-full flex justify-center items-center w-12 h-12 p-4">
              ZE
            </span>
            <p>
              <span className="block">Zyad Elbehiry</span>
              <span className="text-gray-400 block">Full-Stack Developer</span>
            </p>
          </div>

          <p data-reveal="left" className="mt-3 max-w-sm text-gray-400">
            I&apos;m always open to collaborations and creative challenges.
          </p>

          <div data-reveal="left" className="mt-10 flex flex-col gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white">
                <MailIcon />
              </span>
              <span className="text-sm md:text-base">{CONTACT_EMAIL}</span>
            </a>

            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
              className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white">
                <PhoneIcon />
              </span>
              <span className="text-sm md:text-base">{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <div data-reveal="form" className="relative  ">
          <div ref={formWrapRef}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
              <Field label="Name" required={true}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder=""
                  className={inputClasses}
                />
              </Field>

              <Field label="Email" required={true}>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder=""
                  className={inputClasses}
                />
              </Field>

              <div className="flex justify-between gap-8">
                <Field label="Phone (optional)" classNames="w-1/2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder=""
                    className={`${inputClasses}`}
                  />
                </Field>

                <Field label="Budget (optional)" classNames="w-1/2">
                  <div className="relative">
                    <select
                      name="budget"
                      defaultValue=""
                      className={`${inputClasses} appearance-none pr-10`}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {BUDGET_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-black"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </Field>
              </div>

              <Field label="Message" required={true}>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder=""
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-background px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-white disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </div>

          <div
            ref={successRef}
            className="pointer-events-none absolute inset-0 flex max-w-sm flex-col justify-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <CheckIcon />
            </div>
            <h3 className="text-2xl font-bold">Message sent</h3>
            <p className="mt-2 text-gray-400">
              Thanks for reaching out — I&apos;ll get back to you within a day
              or two.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClasses =
  "w-full border-b border-text-primary  px-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-white";

function Field({
  label,
  classNames,
  required,
  children,
}: {
  label: string;
  classNames?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${classNames}`}>
      <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">
        <span>{label}</span>
        {required && <span className="text-xl text-white">*</span>}
      </span>
      {children}
    </label>
  );
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
