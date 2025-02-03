"use client";
import { useEffect, useState } from "react";
import { navigationItems, socialMediaItems } from "@/data";
import { MailIcon, PhoneIcon, MapPinHouseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url = window.location.href.toString();
    setIsLoggedIn(url.includes("sign-up") || url.includes("sign-in"));
  }, []);
  return (
    !isLoggedIn && (
      <footer>
        <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
           
            <div>
              <div className="flex justify-center text-primary-100 sm:justify-start">
                <Link className="flex text-primary-100" href="/">
                  <Image alt="logo" src={"./logo.svg"} width={30} height={30} />
                  <span className="font-extrabold ml-2 text-xl">TrendHive</span>
                </Link>
              </div>

              <p className="mt-6 max-w-md text-center leading-relaxed text-primary-200 sm:max-w-xs sm:text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt consequuntur amet culpa cum itaque neque.
              </p>

              <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                {socialMediaItems.map((item: string) => (
                  <li className="curso-pointer" key={item}>
                    <Image alt="social" src={item} width={25} height={25} />
                  </li>
                ))}
              </ul>
            </div>

           
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-primary-100">
                  Quick Links
                </p>
                <ul className="mt-8 space-y-4 text-sm">
                  {navigationItems.map((item, index) => (
                    <li className="text-primary-200" key={index}>
                      <a href={item.href}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-primary-100">
                  Our Services
                </p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="text-primary-200 transition hover:text-primary-100/75"
                      href="#"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary-200 transition hover:text-primary-100/75"
                      href="#"
                    >
                      Web Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary-200 transition hover:text-primary-100/75"
                      href="#"
                    >
                      Marketing
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary-200 transition hover:text-primary-100/75"
                      href="#"
                    >
                      Google Ads
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-primary-100">
                  Helpful Links
                </p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="text-primary-200 transition hover:text-primary-100/75"
                      href="#"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary-200 transition hover:text-primary-100/75"
                      href="#"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-primary-100">
                  Contact Us
                </p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href="#"
                    >
                      <MailIcon color="#3d4b64" size={25} />
                      <span className="flex-1 text-primary-200">
                        john@doe.com
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href="#"
                    >
                      <PhoneIcon color="#3d4b64" size={25} />
                      <span className="flex-1 text-primary-200">
                        0123456789
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                    <MapPinHouseIcon color="#3d4b64" size={25} />
                    <address className="-mt-0.5 flex-1 not-italic text-primary-200">
                      213 Lane, London, United Kingdom
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          
          <div className="mt-12 border-t border-gray-200 pt-6">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm text-primary-100">
                <span className="block sm:inline">All rights reserved.</span>
                <a className="inline-block text-primary-200 underline" href="#">
                  Terms & Conditions
                </a>
                <span>&middot;</span>
                <a className="inline-block text-primary-200 underline" href="#">
                  Privacy Policy
                </a>
              </p>

              <p className="mt-4 text-sm text-primary-100 sm:order-first sm:mt-0">
                &copy; {new Date().getFullYear()} Ammar ElShreef
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
