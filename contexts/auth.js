import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { api } from "../pages/api/index";
import Home from "../pages";

export const getCurrUser = async () => {
  if (isAuthenticated()) {
    const userId = Cookies.get("userId");
    const token = Cookie.get("token");
    await api.get(`/user/${userId}`, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
  }
};

export const signin = async (values, callback) => {
  await api
    .post("signin", values, {
      "Content-Type": "application/json",
    })
    .then((response) => {
      console.log(response);
      console.log("Got token");
      Cookies.set("token", response.data.token, { expires: 60 });
      Cookies.set("userId", response.data.user._id);
      callback(response.data);
      // return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        callback(error.response);
        // return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        callback(error.status);
        // return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback(error.message);
        // return error.message;
      }
    });
};

export const isAuthenticated = () => {
  const token = Cookies.get("token");
  if (token) {
    return true;
  } else return false;
};

export const signout = async (callback) => {
  await api
    .get("/signout")
    .then((response) => {
      console.log(response);
      Cookies.remove("token");
      Cookies.remove("userId");
      callback(response.data);
      Router.push("/");
    })
    .catch((error) => {
      if (error.response) {
        console.log(response);
        callback(error.response);
      }
    });
};

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setAuthenticated(isAuthenticated());
    if (!authenticated) {
      router.push("/");
    }
  }, []);
  // if (!authenticated)
  //   return <ReactLoading type={"spinningBubbles"} color="#f1f" />;
  // if (!authenticated) {
  //   // useEffect(() => {
  //   router.push("/");
  //   // });
  // }
  if (authenticated) return children;
  return <Home />;
};
