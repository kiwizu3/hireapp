import React from "react";


const Product = ({ item, deleteProduct }) => {
    return (
        <>
            <div className="p-4 card border-dotted mb-3 ">
                <div className="d-flex align-items-center justify-content-between">
                    <img className="product-image" src={item.productImage} />
                    <div className="ms-2">
                        <p className="mb-0">Title</p>
                       <p className="mt-0 fw-bold"> {item.productName}</p>
                    </div>
                    {/* <div>
                        {item.product}
                    </div> */}
                    <div className="ms-auto">
                        <button className="btn btn-sm btn-transparent p-0" onClick={() => deleteProduct(item.productId)}><img className="btn-icon" src="images/icons/delete.svg"/></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;