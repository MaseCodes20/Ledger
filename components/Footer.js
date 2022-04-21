import React from "react";
import { MailIcon } from "@heroicons/react/solid";
import Image from "next/image";

function Footer() {
  return (
    <div className="h-[87px] pt-2 border-t-2 border-[#8985F2] lg:absolute bg-[#151426] bottom-0 w-full">
      <div className="text-center text-xs">
        <p>
          Built and designed by{" "}
          <span>
            <a
              href="https://www.masecodes.com"
              target="_blank"
              rel="noreferrer"
            >
              Masecodes
            </a>
          </span>
        </p>

        <div className="flex justify-center items-center mt-1">
          <p>All rights reserved.</p>
          <div className="relative h-4 w-4">
            <Image
              src="/copyrightlogoWhite.png"
              className="h-4 ml-1 mix-blend-screen"
              alt="copyright logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-center items-center">
        <a
          href="https://www.linkedin.com/in/todd-mason-491659231/"
          target="_blank"
          rel="noreferrer"
          className="mr-1 text-white"
        >
          <div className="relative h-6 w-6">
            <Image
              src="/LI-In-Bugwhite.png"
              className="h-6"
              alt="LinkedIn logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </a>

        <a
          href="https://github.com/MaseCodes20"
          target="_blank"
          rel="noreferrer"
          className="mx-3"
        >
          <div className="relative h-6 w-6">
            <Image
              src="/GitHub-Mark-Light-120px-plus.png"
              className="h-6"
              alt="GitHub logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </a>

        <a
          href="mailto:todd.k.mason@gmail.com"
          rel="noreferrer"
          className="ml-1"
          aria-label="Send mail link"
        >
          <MailIcon className="h-8 text-white" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
