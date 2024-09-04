const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ isSuccess: false, message: errors.array[0] });
  }

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

    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ isSuccess: true, message: "New User is successfully created." });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: errors.message });
  }
};

exports.login = (req, res, next) => {};
