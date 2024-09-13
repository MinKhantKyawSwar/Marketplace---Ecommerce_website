const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();
const adminController = require("../controllers/admin")
const authMiddleware = require("../middlewares/Auth");
const adminMiddleware = require("../middlewares/isAdmin")

//get all products
//GET /admin/products
router.get("/products", authMiddleware, adminMiddleware, adminController.getAllProducts)

module.exports = router;
