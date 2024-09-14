const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  // if there is any errors
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  //collecting input data of users from body
  const { name, email, password } = req.body;

  try {
    // checking if user emails are already existed
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      throw new Error("User already exists.");
    }

    //using bcrypt to make password with hash value
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new users
    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    //user successfully created
    return res
      .status(201)
      .json({ isSuccess: true, message: "Account is successfully created." });
  } catch (error) {
    return res.status(409).json({ isSuccess: false, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  // if there is any errors
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  //collecting input data of users from body
  const { email, password } = req.body;
  try {
    // checking if email exist
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      throw new Error("Email does not exist.");
    }

    // checking password
    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      throw new Error("Wrong User Credentials.");
    }

    //account status check
    if(userDoc.status == "banned"){
      throw new Error("This Account is temporarily disabled by the admin.");
    }

    //create jwt token
    const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    //login success
    return res.status(200).json({
      isSuccess: true,
      message: "Login Successful.",
      token,
    });
  } catch (error) {
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};

exports.checkCurrentUser = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.userId).select("name email role");
    if (!userDoc) {
      throw new Error("Unauthorized User");
    }
    res.status(200).json({
      isSuccess: true,
      message: "User is authorized",
      userDoc,
    });
  } catch (error) {
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};
