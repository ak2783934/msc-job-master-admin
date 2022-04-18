import React, { useState } from "react";

import Link from "next/link";
const Navbar = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <div className="h-[70px] flex flex-row justify-between w-full bg-[#174378] px-[70px]">
      <div className="w-[100px]">
        <Link href="/">
          <a className="flex flex-col items-center px-4 md:px-0">
            <img src="/msc-logo.svg" className="h-14" alt="msc-logo" />
            <div className="pt-1 text-white font-Rochester text-tint md:pt-0 md:text-[10px]">
              Better Career
            </div>
          </a>
        </Link>
      </div>
      {!isLogin && (
        <div className="flex flex-row">
          <Link href="https://www.mscjobs.com">
            <div className="px-3 mx-4 text-green-300 cursor-pointer my-auto border-2 border-green-600 h-[30px] py-auto rounded text-white">
              Go to website
            </div>
          </Link>
          <Link href="/">
            <div className="px-3 my-auto cursor-pointer h-[30px] py-auto rounded text-white">
              Login
            </div>
          </Link>
        </div>
      )}
      {isLogin && (
        <div className="flex flex-row">
          <Link href="/jobs">
            <div className="px-1 mx-2 text-green-300 cursor-pointer my-auto border-2 border-green-600 h-[30px] py-auto rounded text-white">
              Post New Job
            </div>
          </Link>
          <Link href="/jobs">
            <div className="px-2 mx-2 cursor-pointer my-auto h-[30px] py-auto rounded text-white">
              Jobs
            </div>
          </Link>
          {/* <Link href="/notice">
            <div className="px-2 mx-2 cursor-pointer my-auto h-[30px] py-auto rounded text-white">
              Notice
            </div>
          </Link>
          <Link href="/contact">
            <div className="px-2 mx-2 cursor-pointer my-auto h-[30px] py-auto rounded text-white">
              Contact
            </div>
          </Link> */}
          <Link href="/profile">
            <div className="px-2 mx-2 cursor-pointer my-auto  h-[30px] py-auto rounded text-white">
              Profile
            </div>
          </Link>
          <Link href="/">
            <div className="px-2 mx-2 cursor-pointer my-auto h-[30px] py-auto rounded text-white">
              Logout
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
