import { useEffect, useState, useRef } from "react";
import { CiTrash } from "react-icons/ci";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import PlanetScaleStatusIndicator from "./status/PlanetScaleStatus";
import FirebaseStorageStatus from "./status/FirebaseStorageStatus";

const Home = ({ products, deleteProduct }) => {
  return (
    <>
      <div>
        <h2>KLP</h2>
        <div>
          {products && products.map((item, index) => {
            return (
              <div key={item.productId} className={styles.product}>
                <span>Product Id</span>: {item.productId} <br />{" "}
                <span>Product Name</span>: {item.productName}{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(item.productId)}
                >
                  Delete
                </button>
              </div>
            );
          })}
          {products && !products.length ? <>No products found</> : ""}
        </div>
        <br />
        {/* <PlanetScaleStatusIndicator /> */}
        <FirebaseStorageStatus />
      </div>
    </>
  );
};

export default Home;
