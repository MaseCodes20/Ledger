import React from "react";
import { MailIcon } from "@heroicons/react/solid";

function Footer() {
  return (
    <div className="h-[87px] pt-2 border-t-2 border-[#8985F2] absolute bottom-0 w-full">
      <div className="text-center text-xs">
        <p>Built and designed by Todd Mason</p>

        <div className="flex justify-center items-center mt-1">
          <p>All rights reserved.</p>
          <img
            src="copyrightlogoWhite.png"
            className="h-4 ml-1 mix-blend-screen"
            alt="copyright logo"
          />
        </div>
      </div>
      <div className="mt-2 flex justify-center items-center">
        <a
          href="https://www.linkedin.com/in/todd-mason-491659231/"
          target="_blank"
          rel="noreferrer"
          className="mr-1 text-white"
        >
          <img src="LI-In-Bugwhite.png" className="h-6" alt="GitHub logo" />
        </a>

        <a
          href="https://github.com/MaseCodes20"
          target="_blank"
          rel="noreferrer"
          className="mx-3"
        >
          <img
            src="GitHub-Mark-Light-120px-plus.png"
            className="h-6"
            alt="GitHub logo"
          />
        </a>

        <a
          href="mailto:todd.k.mason@gmail.com"
          rel="noreferrer"
          className="ml-1"
        >
          <MailIcon className="h-8 text-white" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
