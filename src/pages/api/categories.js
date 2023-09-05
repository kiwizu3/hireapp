import { query } from "@/lib/db";

export default async function handler(req, res) {
  let message;

  if (req.method === "GET") {
    const categories = await query({
      query: "SELECT * FROM categories",
      values: [],
    });
    res.status(200).json({ categories: categories });
  }

  if (req.method === "POST") {
    const categoryName = req.body.categoryName;
    const addCategories = await query({
      query: "INSERT INTO categories (categoryName) VALUES (?)",
      values: [categoryName],
    });
    let category = [];
    if (addCategories.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    category = {
      categoryId: addCategories.insertId,
      categoryName: categoryName,
    };
    res.status(200).json({ response: { message: message, category: category } });
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
    const categoryId = req.body.categoryId;
    const deleteProducts = await query({
      query: "DELETE FROM categories WHERE categoryId = ?",
      values: [categoryId],
    });
    const result = deleteProducts.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res
      .status(200)
      .json({ response: { message: message, categoryId: categoryId } });
  }
}
