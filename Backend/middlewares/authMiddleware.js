import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base



export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
    console.log("Token received by backend:", token);
    if (!token) throw new Error("Token missing");

    console.log("JWT_SECRET in backend:", process.env.JWT_SECRET);
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded);

    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).send({
      success: false,
      message: "Authorization token missing or invalid",
    });
  }
};




//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
