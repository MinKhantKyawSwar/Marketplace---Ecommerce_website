const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const productController = require("../controllers/product");
const bidController = require("../controllers/bid");
const notificationController = require("../controllers/notification");
const authMiddleware = require("../middlewares/Auth");

//add product
// POST/ create-product
router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Product Name is required."),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description is required."),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required."),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required."),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Product used For is required."),
    body("product_details")
      .isArray()
      .withMessage("Product details mush be an array."),
  ],
  productController.addNewProduct
);

//get all products
//GET /products/:id of seller
router.get("/products", authMiddleware, productController.getAllProducts);

//get old single product
//GET /product/:id of product
router.get("/products/:id", authMiddleware, productController.getOldProduct);

//update product
//POST /update-product
router.post(
  "/update-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Product Name is required."),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description is required."),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required."),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required."),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Product used For is required."),
    body("product_details")
      .isArray()
      .withMessage("Product details mush be an array."),
  ],
  productController.updateProduct
);

//delete product
//DELETE /product/:id
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

//upload product image
//POST /upload
router.post("/upload", authMiddleware, productController.uploadProductImage);

//get saved product document
//GET /product-images/:id
router.get(
  "/product-images/:id",
  authMiddleware,
  productController.getSavedImages
);

//delete product image
//DELETE /products/images/destroy/:productId/:imgToDelete
router.delete(
  "/products/images/destroy/:productId/:imgToDelete",
  authMiddleware,
  productController.deleteProductImages
);

//save product
//POST /saved-products/:id
router.post("/saved-products/:id",authMiddleware, productController.savedProduct)

//save product
//GET /saved-products
router.get("/saved-products",authMiddleware, productController.getSavedProducts)

//delete saved product
//DELETE /unsaved-products/:id
router.delete("/unsaved-products/:id", authMiddleware,productController.unSavedProduct)

// save new bid
//POST /add-bid
router.post("/add-bid",
  [
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required."),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone Number is required."),
  ],
    authMiddleware,bidController.savedNewBid
);

// get all bids
// GET /bids/:product_id
router.get("/bids/:product_id", bidController.getAllBids);

// push noti
// POST /notify
router.post("/notify", authMiddleware, notificationController.pushNotification)

// get notifications
// GET /notifications
router.get("/notifications", authMiddleware, notificationController.getNotifications)

// make noti as read
// GET /notifications-read/:id
router.get("/notifications-read/:id", authMiddleware, notificationController.markAsRead)

// delete noti
// DELETE /notification-delete
router.delete("/notification-delete/:id", authMiddleware, notificationController.deleteNoti);

// delete all noti
// DELETE /notification-delete-all
router.delete("/notification-delete-all", authMiddleware, notificationController.deleteAllNoti);

module.exports = router;
