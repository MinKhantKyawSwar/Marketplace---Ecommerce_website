const Product = require("../models/products");

exports.getProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};