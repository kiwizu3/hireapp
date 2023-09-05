import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link  from "next/link";
const Gallery = () => {
  const router = useRouter();
  const type = router.query.type;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const selectedCategoryId = categories?.find(
    (item) => item.categoryName.toLowerCase() === type
  )?.categoryId;
  const productFilter = products.filter(
    (item) => item.categoryId === selectedCategoryId
  );
 console.log("filtered", productFilter)

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

  useEffect(() => {
    getProducts();
    getCategories();
    if(type === ''){
      if(productFilter.length === 0){
        router.push("/");
      }
    }
  }, [type]);

  return (
    <>
      <div className="row">
        <div className="mt-3 mx-4 col-12">
          <div className="d-flex align-items-center mb-3">
            <Link href="/">
              <img
                src="./images/icons/back.svg"
                width="24"
                height="24"
                role="img"
              />
            </Link>
            <h2 className="ms-2 mb-0">Gallery - {type}</h2>
          </div>
        </div>
      </div>
      <div className="row mx-3">
        {productFilter.map(
          ({ productId, productName, productImage, categoryId }) => {
            return (
              <div key={productId} className="col-lg-3 col-md-3 col-sm-12 mb-3">
                <div className="card border-dotted">
                  <img className="img-fluid" src={productImage} />
                  <div className="p-2">
                    <div>
                      <small>Name</small>
                      <p className="my-0 fw-bold">{productName}</p>
                    </div>
                    <hr className="my-1" />
                    <div>
                      <small>Category</small>
                      <p className="my-0 fw-bold">
                        {categories &&
                          categories.find(
                            (item) => item.categoryId === categoryId
                          ).categoryName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};
export default Gallery;
