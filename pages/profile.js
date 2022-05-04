import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../layout";
import Router, { useRouter } from "next/router";
import { isAuthenticated, signin } from "../contexts/auth";

const Profile = () => {
  const Router = useRouter();
  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
    }
  }, []);
  return (
    <Layout>
      <Head>
        <title>Msc Jobs Master</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen grow bg-[#008BF3] py-[70px]">
        <div className="w-[800px] h-auto flex flex-row mx-auto bg-[#1F5050] pb-10">
          <Link href="/">
            <a className="flex flex-col items-center p-5 border-b-2 border-r-2 border-gray-700">
              <img
                src="/msc-logo.svg"
                className="h-[80px] w-[80px]"
                alt="msc-logo"
              />
              <div className="pt-1 text-white font-Rochester text-tiny md:pt-0 md:text-[10px]">
                Better Career
              </div>
            </a>
          </Link>

          <div className="text-xl font-bold text-center text-white border-b-2 border-gray-700 py-auto grow">
            <div className="my-[50px]">Master admin panel</div>
          </div>

          {/* <hr className="w-full my-24 border-t-2 border-gray-700" /> */}
        </div>
        <div className="w-[800px] h-auto pb-8 mx-auto bg-[#1F5050]">
          <div className="w-[80%] grid grid-cols-2 gap-7 mx-auto text-center">
            <Link href="/post-job">
              <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
                JOB POSTING
              </div>
            </Link>
            <Link href="/jobs">
              <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
                JOB APPLICATION
              </div>
            </Link>
            <Link href="/updatefrontmsg">
              <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
                UPDATE FRONT MESSAGE
              </div>
            </Link>

            <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
              E-MAIL REQUEST
            </div>
            <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
              CAREER TIPS
            </div>
            <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
              PREMIUM SERVICE REQUEST
            </div>
            <div className="bg-[#C4C4C4] rounded-xl cursor-pointer py-4">
              EMPLOYER
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
