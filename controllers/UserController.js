import userModel from "../models/userModel.js";
import studentModel from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registerController = async (req, res) => {
  const { email } = req.body;
  try {
    const registerUser = await userModel.findOne({ email: email });
    if (registerUser) {
      return res
        .status(200)
        .send({ message: "User Already Registered", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const User = await userModel.findOne({ email: req.body.email });
    if (!User) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, User.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Email or Password is invalid", success: false });
    }
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ message: "Login Sucessfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login Ctrl ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userID });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Auth Error ${error.message}` });
  }
};

const addStudentController = async (req, res) => {
  try {
    const newStudent = new studentModel(...req.body);
    await newStudent.save();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error while adding student ${error.message}` });
  }
};

export default {
  loginController,
  registerController,
  authController,
  addStudentController,
};
