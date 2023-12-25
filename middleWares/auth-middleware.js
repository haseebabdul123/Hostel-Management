import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

var checkUserAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({ message: "Auth Failed", success: false });
      } else {
        req.body.userID = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Auth Failed", success: false });
  }
};
export default checkUserAuth;
