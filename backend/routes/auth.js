const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const authController = require("../controllers/auth");

//create new user
//POST -> /register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must have at least 3 characters."),
    body("email").trim().isEmail().withMessage("Please enter a valid Email"),
    body("password").isEmpty().withMessage("Password cannot be empty."),
  ],

  authController.register
);

//login user
//POST -> /login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid Email"),
    body("password").isEmpty().withMessage("Password cannot be empty."),
  ],
  authController.login
);

module.exports = router;
