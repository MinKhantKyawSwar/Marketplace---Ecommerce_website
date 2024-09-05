const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/Auth");

//create new user
//POST -> /register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ min: 3 })
      .withMessage("Name should have at least 3 characters."),
    body("email").trim().isEmail().withMessage("Please enter a valid Email"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty.")
      .isLength({ min: 5 })
      .withMessage("Password should have at least 5 characters."),
  ],
  authController.register
);

//login user
//POST -> /login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid Email"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty.")
      .isLength({ min: 5 })
      .withMessage("Password should have at least 5 characters."),
  ],
  authController.login
);

//check user if he has already logined or not
//GET /get-current-user
router.get(
  "/get-current-user",
  authMiddleware,
  authController.checkCurrentUser
);

module.exports = router;
