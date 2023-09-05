import { useEffect, useState, useRef } from "react";

import { CiTrash } from "react-icons/ci";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.scss";

import Home from "./Home";
import LoginPage from "./login";

const App = () => {
  const router = useRouter();

  return (
    <>
      <Home />
    </>
  );
};

export default App;
