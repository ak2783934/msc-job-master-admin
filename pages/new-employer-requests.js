import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { isAuthenticated } from "../contexts/auth";
import { api } from "./api";
import ReactLoading from "react-loading";

const IndividualRequest = ({ user }) => {
  const { _id, nameOfOrg, founder, emailId, contact, aboutUs } = user;
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  return (
    <div className="bg-[#B6B3B3] my-3 p-2 py-3 font-semibold rounded">
      <div className="flex flex-row">
        <div className="w-[200px] text-right">
          <div>Name Of Org :</div>
          <div>Founder : :</div>
          <div>Email :</div>
          <div>Contact :</div>
          <div>About us : </div>
        </div>
        <div className="grow">
          <div>{nameOfOrg}</div>
          <div>{founder}</div>
          <div>{emailId}</div>
          <div>{contact}</div>
          <div>{aboutUs}</div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            api
              .post(
                `/user/verify/${userId}`,
                { reqUserId: _id },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                // console.log(response);
                alert("Verified");
                console.log(response);
                Router.reload(window.location.pathname);
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
              });
          }}
        >
          <img
            className="w-7 h-7"
            src="/approve-icon.png"
            alt="approve button"
          />
        </div>
      </div>
    </div>
  );
};

const NewEmployerRequest = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
    }
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    api
      .get(`/user/getAllUnverified/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUnverifiedUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Msc jobs employers </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-auto bg-[#008BF3] py-[70px]">
        <div className="w-[800px] h-auto mx-auto bg-[#1F5050] py-[30px]">
          <div className="m-4 border-b-2 border-gray-700">
            <Link href="/">
              <a className="flex flex-col items-center px-16 py-8">
                <img src="/msc-logo.svg" className="h-[100px]" alt="msc-logo" />
                <div className="pt-1 text-white font-Rochester text-tiny md:pt-0 md:text-[10px]">
                  Better Career
                </div>
              </a>
            </Link>
          </div>
          <div className="text-xl font-bold text-center text-white">
            EMAIL REQUEST
          </div>
        </div>
        <div className="w-[800px] my-6 h-auto mx-auto bg-white px-[30px] py-[30px]">
          {loading && (
            <ReactLoading
              className="mx-auto"
              type={"spinningBubbles"}
              color="#008BF3"
            />
          )}
          {unverifiedUsers.length === 0 && (
            <div className="py-3 text-center text-red-700">
              No request are present currently
            </div>
          )}

          <div className="h-[400px] overflow-auto">
            {unverifiedUsers.map((user, index) => {
              return <IndividualRequest key={index} user={user} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewEmployerRequest;
