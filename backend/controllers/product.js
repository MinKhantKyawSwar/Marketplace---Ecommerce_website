const { validationResult } = require("express-validator");
const Product = require("../models/products");

exports.addNewProduct = async (req, res) => {
  const errors = validationResult(req);

  // if there is any errors
  if (!errors.isEmpty()) {
    return res
      .status(402)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }
  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_used_for,
    product_details,
  } = req.body;

  try {
    const productDoc = await Product.create({
      name: product_name,
      description: product_description,
      price: product_price,
      category: product_category,
      usedFor: product_used_for,
      details: product_details,
      seller: req.userId,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "Product is successfully listed.",
      productDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
