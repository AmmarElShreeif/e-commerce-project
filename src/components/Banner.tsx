"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Banner() {
  const [show, setShow] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url = window.location.href.toString();
    setIsLoggedIn(url.includes("sign-up") || url.includes("sign-in"));
  }, [isLoggedIn]);
  return (
    !isLoggedIn && (
      <div
        className={`${
          show ? "flex" : "hidden"
        } relative isolate flex bg-primary-100 items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}
      >
        <div aria-hidden="true" className="absolute">
          <div className="aspect-[577/310] md:w-[36.0625rem] " />
        </div>
        <div aria-hidden="true" className="absolute">
          <div className="aspect-[577/310] md:w-[36.0625rem]" />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-xs md:text-sm/6 text-gray-300">
            <strong className="font-semibold">
              TrendHive {new Date().getFullYear()}
            </strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline size-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            Unleash Your Style with TrendHive – Where Fashion Meets You!
          </p>
          <a
            href="#"
            className="md:flex-none rounded-full hidden bg-gray-900 px-1.5 text-xs md:px-3.5 py-1 md:text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Shopping now <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <X
              onClick={() => setShow(false)}
              aria-hidden="true"
              className="size-5 text-gray-300"
            />
          </button>
        </div>
      </div>
    )
  );
}
