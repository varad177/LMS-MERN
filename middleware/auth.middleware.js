import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = async (req, res, next) => {

  const { token } = req.cookies;
  
  console.log("thr",token);

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthenticated, please login again",
    });
  }

  const userdetails = await Jwt.verify(token, process.env.JWT_SECRETE);

  req.user = userdetails;
  next();
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return res.status(403).json({
        success: false,
        message: "you don't have permission to access the system",
      });
    }

    next();
  };

const authorizedSubcriber = async (req, res, next) => {
  const user = await User.findById(req?.user?.id);
  const subcription = user?.subscription;
  const currentUserRole = user?.role;
  if (currentUserRole !== "ADMIN" || subcription.status !== "active") {
    return res.status(403).json({
      success: false,
      message: "please subcribed first to access",
    });
  }
};

export { isLoggedIn, authorizedRoles, authorizedSubcriber };
