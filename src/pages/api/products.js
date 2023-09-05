import { query } from "@/lib/db";

export default async function handler(req, res) {
  let message;

  if (req.method === "GET") {
    const products = await query({
      query: "SELECT * FROM products",
      values: [],
    });
    res.status(200).json({ products: products });
  }

  if (req.method === "POST") {
    
    const productName = req.body.productName;
    const productImage = req.body.productImage;
    const categoryId = req.body.categoryId;

    const addProducts = await query({
      query: "INSERT INTO products (productName, productImage, categoryId) VALUES (?,?,?)",
      values: [productName, productImage, categoryId],
    });
    let product = [];
    if (addProducts.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    product = {
      productId: addProducts.insertId,
      productName: productName,
      // productImage: productImage,
      // categoryId: categoryId,
    };
    res.status(200).json({ response: { message: message, product: product } });
  }

  if (req.method === "PUT") {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const updateProducts = await query({
      query: "UPDATE products SET productName = ? WHERE productId = ?",
      values: [productName, productId],
    });
    const result = updateProducts.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const product = {
      productId: productId,
      productName: productName,
    };
    res.status(200).json({ response: { message: message, product: product } });
  }

  if (req.method === "DELETE") {
    const productId = req.body.productId;
    const deleteProducts = await query({
      query: "DELETE FROM products WHERE productId = ?",
      values: [productId],
    });
    const result = deleteProducts.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res
      .status(200)
      .json({ response: { message: message, productId: productId } });
  }
}
