const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const { jwtSecret } = require("../secret");

const userRegister = async (req, res) => {

  try {

    const { name, email, password } = req.body;


    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already exists");
    }



    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({

      success: true,
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}




const userLogin = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }


    if (user.status !== "active") {
      throw new Error("The user account is blocked , please contact admin");
    }


    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: "30d",
    });


    res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

}




const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = { userRegister, userLogin, getCurrentUser, getAllUsers };