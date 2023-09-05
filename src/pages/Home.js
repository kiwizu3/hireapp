import { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";

const Home = () => {
  const webTitle = "Kasun Liyadipita";
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      postData
    );
    const response = await res.json();
    setCategories(response.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-lg-6 col-sm-12 order-lg-1 order-2 my-auto">
            <h1 className="fw-bold">
              {webTitle} <br /> Photography
            </h1>
            <div className="d-flex justifyContentCenter">
              {categories &&
                categories.map(({ categoryId, categoryName }) => {
                  return (
                    <Link
                      key={categoryId}
                      className="nav-link px-0 text-success"
                      href={`/gallery?type=${categoryName.toLowerCase()}`}
                    >
                      <p className="main-item">{categoryName}</p>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 order-lg-2 order-1  my-auto">
            <img className="img-fluid" src="images/main.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
