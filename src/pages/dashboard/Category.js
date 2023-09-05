import { useEffect, useState, useRef } from "react";
import { CiTrash } from "react-icons/ci";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";

const Category = ({ categories, setCategories }) => {
  const categoryNameRef = useRef();
  const productIDToDeleteRef = useRef();
  const productIDToUpdateRef = useRef();
  const productNameToUpdateRef = useRef();
  const [updated, setUpdated] = useState(false);
  const [updatedError, setUpdatedError] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deletedError, setDeletedError] = useState(false);

  const addCategory = async () => {
    const categoryName = categoryNameRef.current.value.trim();
    if (categoryName.length < 3) return;
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    };
    if (categoryName.length < 3) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      postData
    );
    const response = await res.json();
    console.log(response);
    if (response.response.message !== "success") return;
    const newcategory = response.response.category;

    setCategories([
      ...categories,
      {
        categoryId: newcategory.categoryId,
        categoryName: newcategory.categoryName,
      },
    ]);
    setCreated(true);
  };

  const deleteCategory = async (id) => {
    if (!id) return;
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: id,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      postData
    );
    const response = await res.json();
    console.log(response.response);
    if (response.response.message === "error") return setDeletedError(true);
    const idToRemove = parseFloat(response.response.categoryId);
    setCategories(categories.filter((a) => a.categoryId !== idToRemove));
    setDeleted(true);
  };

  //  const updateProduct = async () => {
  //     const productIDToUpdate = productIDToUpdateRef.current.value.trim();
  //     const productNameToUpdate = productNameToUpdateRef.current.value.trim();
  //     if (!productIDToUpdate.length) return;
  //     const postData = {
  //         method: "PUT",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //             productId: productIDToUpdate,
  //             productName: productNameToUpdate,
  //         }),
  //     };
  //     const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_URL}/api/products`,
  //         postData
  //     );
  //     const response = await res.json();
  //     if (response.response.message === "error") return setUpdatedError(true);
  //     // if (response.response.message !== "success") return;
  //     const productIdUpdated = parseFloat(response.response.product.productId);
  //     const productUpdatedName = response.response.product.productName;
  //     //updating state
  //     const productsStateAfterUpdate = products.map((product) => {
  //         if (product.productId === productIdUpdated) {
  //             const productUpdated = {
  //                 ...product,
  //                 productName: productUpdatedName,
  //             };
  //             return productUpdated;
  //         } else {
  //             return {
  //                 ...product,
  //             };
  //         }
  //     });
  //     setUpdated(true);
  //     setProducts(productsStateAfterUpdate);
  // }

  return (
    <>
      <div className="container">
        <div className="row">
          <h2>Categories</h2>
          <div className={styles.input}>
            <div className={styles.label}>Category Name</div>
            <input type="text" ref={categoryNameRef} />
          </div>
          {created ? <div className={styles.success}>Success!</div> : null}
          <div>
            <input
              className="btn btn-dark btn-sm mt-3"
              value="Save"
              type="button"
              onClick={addCategory}
            />
          </div>
        </div>
        <div className="row">
          <br />
          <hr />
          <div className={styles.products}>
            {categories && categories.map((item, index) => {
              return (
                <div key={item.categoryId} className={styles.product}>
                  <span>Category Id</span>: {item.categoryId} <br />{" "}
                  <span>Category Name</span>: {item.categoryName}{" "}
                  <CiTrash
                    className={styles.icons}
                    onClick={() => deleteCategory(item.categoryId)}
                  />
                </div>
              );
            })}
            {categories && !categories.length ? <>No products found</> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
