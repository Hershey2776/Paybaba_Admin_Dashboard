import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

const Logout = () => {
  useEffect(() => {
    setTimeout(() => {}, 3000);

    localStorage.removeItem("admin");

    Router.push("/login");
  }, []);

  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paybaba. </title>
      </Head>

      <ToastContainer />

      <div className="Logout"></div>
    </div>
  );
};

export default Logout;
