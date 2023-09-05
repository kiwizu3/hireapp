

import { useEffect, useState, useRef, useCallback } from "react";
import { firebase, initializeApp } from "firebase/app";
import { storage } from "../../lib/firebase.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CiTrash } from "react-icons/ci";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Product from "@/components/Product.js";
import styles from "@/styles/Home.module.scss";

const Edit = ({ productNameRef, addProduct, created, deleteProduct, products, categories, productImageRef, categoryIdRef, mediaUpload, setMediaUpload }) => {

    const [showAddImage, setShowAddImage] = useState(false);
    const [fileBase64, setFileBase64] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const [fileUrl, setFileUrl] = useState(null);

    const handleChange = useCallback(async (e) => {
        setIsUploadingImage(true);
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            console.log("file", file.name)

            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            console.log("url", url);
            setFileUrl(url);
            setMediaUpload({ ...mediaUpload, productImage: url });
        } else {
            setMediaUpload({ ...mediaUpload, [name]: value });
        }
        console.log(mediaUpload);
        if(fileUrl !== ''){
            setIsUploadingImage(false);
        }
    }, [mediaUpload, setMediaUpload])


    // const handleFileChange = async (e) => {
    //     const file = e.target.files[0];
    //     const base64String = await convertFileToBase64(file);
    //     setFileBase64(base64String);
    //     console.log("base64", file, fileBase64);
    // };


    // const convertFileToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    //             resolve(base64String);
    //         };
    //         reader.onerror = error => reject(error);
    //     });

    // }



    return (
        <>
            <div className="row">
                <div className="col">

                    {/* */}

                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Upload Media
                    </button>

                    <div className="mt-3">
                        {products && products.map((item, index) => {
                            return (

                                <Product key={index} item={item} deleteProduct={deleteProduct} />
                                // <div key={item.productId} className={styles.product}>
                                //     <span>Product Id</span>: {item.productId} <br />{" "}
                                //     <span>Product Name</span>: {item.productName}{" "}
                                //     <img className="w-25" src={item.productImage}/>
                                //     <button className="btn btn-danger" onClick={() => deleteProduct(item.productId)}>Delete</button>
                                // </div>
                            );
                        })}
                        {products && !products.length ? <>
                            {/* <div className="d-flex justify-content-center">
                                <div className="spinner-border border-primary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div> */}
                            No Products Found
                        </> : ""}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.create}>
                                <div className="">

                                    <div className="">Title</div>
                                    <input name="productName" className="form-control" type="text" value={mediaUpload?.productName} onChange={handleChange} />

                                    <div className="">Category</div>
                                    <select name="categoryId" className="form-select" aria-label="Default select example" value={mediaUpload?.categoryId} onChange={handleChange}>
                                        {/* <option selected>Open this select menu</option> */}
                                        {categories && categories.map(({ categoryName, categoryId }) => {
                                            return (
                                                <option key={categoryId} value={categoryId}>{categoryName}</option>
                                            )
                                        })}
                                    </select>

                                    <div className="">Media</div>
                                    <input type="file" name="productImage" className="form-control" id="fileInput" onChange={handleChange} />

                                    {/* <input className="form-control" type="text" ref={productNameRef} /> */}
                                    <img className="w-100" src={fileUrl} />
                                </div>
                                {created ? <div className="text-success">Success!</div> : null}
                                <div className="">
                                    <input
                                        className="btn btn-dark"
                                        value="Save"
                                        type="button"
                                        onClick={addProduct}
                                        data-bs-dismiss="modal"
                                        disabled={isUploadingImage}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Edit;



