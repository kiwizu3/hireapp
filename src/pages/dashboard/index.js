import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { CiTrash } from "react-icons/ci";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Edit from "./Edit";
import Category from "./Category";
import useAuthentication from "@/hooks/useAuthentication";

const Dashboard = () => {
  const router = useRouter();
//   const { logout } = useAuthentication();
  const [tab, setTab] = useState("Media");
  const [token, setToken] = useState("");
  const [productName, setProductName] = useState("");

  const [mediaUpload, setMediaUpload] = useState({
    productName: "",
    categoryId: "1",
    productImage: "",
  });

  const productNameRef = useRef();
  const productImageRef = useRef();
  const categoryIdRef = useRef();
  const productIDToDeleteRef = useRef();
  const productIDToUpdateRef = useRef();
  const productNameToUpdateRef = useRef();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [updatedError, setUpdatedError] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deletedError, setDeletedError] = useState(false);


  const handleLogout = (event) =>{
    event.preventDefault();
    localStorage.removeItem("token");
  }

  const addProduct = async () => {
    const { productName, productImage, categoryId } = mediaUpload;

    const category = parseInt(categoryId);
    // console.log("category", category, categoryId)
    // console.log(mediaUpload);
    if (productName.length < 3) return;
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        productImage: productImage,
        categoryId: category,
      }),
    };
    if (productName.length < 3) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`,
      postData
    );
    const response = await res.json();
    console.log(response);
    if (response.response.message !== "success") return;
    const newproduct = response.response.product;

    setProducts([
      ...products,
      {
        productId: newproduct.productId,
        productName: newproduct.productName,
        productImage: newproduct.productImage,
        categoryId: newproduct.categoryId,
      },
    ]);
    setCreated(true);
  };

  const getProducts = async () => {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`,
      postData
    );
    const response = await res.json();
    setProducts(response.products);
    console.log(response);
  };

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
    console.log(response);
  };

  const deleteProduct = async (id) => {
    if (!id) return;
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`,
      postData
    );
    const response = await res.json();
    console.log(response.response);
    if (response.response.message === "error") return setDeletedError(true);
    const idToRemove = parseFloat(response.response.product_id);
    setProducts(products.filter((a) => a.productId !== idToRemove));
    setDeleted(true);
    getProducts();
  };

  const updateProduct = async () => {
    const productIDToUpdate = productIDToUpdateRef.current.value.trim();
    const productNameToUpdate = productNameToUpdateRef.current.value.trim();
    if (!productIDToUpdate.length) return;
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productIDToUpdate,
        productName: productNameToUpdate,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`,
      postData
    );
    const response = await res.json();
    if (response.response.message === "error") return setUpdatedError(true);
    // if (response.response.message !== "success") return;
    const productIdUpdated = parseFloat(response.response.product.productId);
    const productUpdatedName = response.response.product.productName;
    //updating state
    const productsStateAfterUpdate = products.map((product) => {
      if (product.productId === productIdUpdated) {
        const productUpdated = {
          ...product,
          productName: productUpdatedName,
        };
        return productUpdated;
      } else {
        return {
          ...product,
        };
      }
    });
    setUpdated(true);
    setProducts(productsStateAfterUpdate);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (!token) {
      router.push("/login");
    }
  }, [token, handleLogout]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div>
                <p>
                    Logo Here
                </p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Sidebar setTab={setTab} tab={tab} />

            {/* {tab === "Home" && <Home products={products} deleteProduct={deleteProduct} />} */}
            {tab === "Media" && (
              <Edit
                created={created}
                addProduct={addProduct}
                mediaUpload={mediaUpload}
                setMediaUpload={setMediaUpload}
                products={products}
                deleteProduct={deleteProduct}
                categories={categories}
              />
            )}
            {tab === "Category" && (
              <Category categories={categories} setCategories={setCategories} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
