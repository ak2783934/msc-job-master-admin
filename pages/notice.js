import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isAuthenticated } from "../contexts/auth";
import { api } from "./api";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

const IndividualNotice = ({ notice }) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  return (
    <div className="px-3 py-2 bg-[#1F5665] my-4 flex flex-row">
      <div className="w-[95%]">
        <span className="text-gray-300">{notice.msg}</span>
        <span className="inline px-1 text-xs text-green-300">
          {notice.createdAt.slice(0, 10)}
        </span>
        {/* <span className="inline text-xs text-red-600">New</span> */}
      </div>

      <div
        className="cursor-pointer w-[5%]"
        onClick={() => {
          api
            .delete(`/notice/delete/${userId}/${notice._id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              // console.log(response);
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
        <img className="w-5 h-5" src="/delete-icon.svg" alt="delete-button" />
      </div>
    </div>
  );
};

const Notice = () => {
  const Router = useRouter();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllNotices = () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    api
      .get(`notice/getall/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.notices);
        setNotices(response.data.notices.reverse());
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
  };

  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
    }
    getAllNotices();
  }, []);

  const formik = useFormik({
    initialValues: {
      msg: "",
    },
    validationSchema: Yup.object().shape({
      msg: Yup.string().min(3, "Too short").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      await api
        .post(`/notice/create/${userId}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          getAllNotices();
          alert("Notice created!");
          resetForm();
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
    },
  });

  return (
    <Layout>
      <Head>
        <title>Msc jobs employers </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full bg-[#008BF3] py-[35px]">
        <div className="w-[800px] h-auto mx-auto bg-[#1F5050] py-[30px]">
          <div className="flex flex-col mx-[150px] my-4">
            <div className="py-5 text-2xl font-bold text-center text-white">
              Notice
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <textarea
                  name="msg"
                  id="msg"
                  type="text"
                  placeholder="Type new notice here"
                  className="w-full h-[100px] p-3 my-1 text-sm border border-black rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.msg}
                />
                {formik.touched.msg && formik.errors.msg ? (
                  <div className="text-red-700">{formik.errors.msg}</div>
                ) : null}
                <div className="px-4 py-1 mx-auto">
                  <div className="w-[30%] mx-auto ">
                    <button
                      name="Submit"
                      value="Submit"
                      className="w-full p-1 my-1 text-lg bg-blue-300 border border-black rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="h-[350px] no-scrollbar overflow-auto py-4">
              {loading && (
                <ReactLoading
                  className="mx-auto"
                  type={"spinningBubbles"}
                  color="#008BF3"
                />
              )}
              {notices.length === 0 && (
                <div className="py-3 text-center text-red-700">
                  No Notice present
                </div>
              )}
              {notices.map((notice, index) => {
                return <IndividualNotice notice={notice} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notice;
