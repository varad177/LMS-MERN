import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite : true,
  secure: true,
};

const resister = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    // return next(new AppError("All fields are required", 400))
    res.status(400).json({ message: "all fields are required" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    // return next(new AppError("Email Already Exists", 400))
    return res.status(400).json({ message: "email already exist" });
  }

  const user = await User.create({
    fullname,
    email,
    password,
    avatar: {
      public_id: email,
      // secure_url: "https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
      secure_url: "vrd",
    },
  });

  if (!user) {
    // return next(new AppError("user registration failed, please try again", 400))
    res.status(400).json({ message: "registraion failed" });
  }

  //todo -> file upload

  //logic for file upload

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //removed the file from the local system
        fs.rm(`uploads/${req.file.filename}`);
      } else {
        console.log("resuld mot getted");
      }
    } catch (error) {
      return res.status(500).json({ message: "file not found" });
    }
  }

  await user.save();

  user.password = undefined;

  // const token = await user.generateJWTToken();

  // console.log("the token is ", token);

  // res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "user register successfully",
    user,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "email and passsword does not match" });
    }
    const v = await bcrypt.compare(password, user.password);
    if (!v) {
      return res.status(400).json({
        success: true,
        message: "email and passsword does not match",
      });
    }

 

    const token = await user.generateJWTToken();
    console.log("the token", token);
    user.password = undefined;
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "user log-in successfully",
      user,
    });
  } catch (error) {
    // return next(new AppError(error.message, 500))
    return res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
};

const getProfile = async (req, res) => {
  try {
    const {id} = req.params;
  console.log(id);
    const user = await User.findById(id);
   return res.status(200).json({
      success: true,
      message: "User details",
      user : user
    });
  } catch (error) {
    // return next(new AppError("Failed to fetch user details", 400))
    res.status(400).json({ message: "failed to fetch user details" });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "email not register" });
  }

  const resetToken = await User.generatePasswordResetToken();

  await user.save();

  const resetPasswordURL = `${process.env.FRONTENDURL}/reset/${resetToken}`;

  const subject = "reset your password";
  const message = `${resetPasswordURL}`;
  console.log(resetPasswordURL);

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `reset password link has been sent to  ${email}`,
    });
  } catch (error) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;

  const { password } = req.body;

  // const forgotPasswordToken = crypto.create('varad').update(resetToken).digest('hex')
  const forgotPasswordToken = resetToken;
  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    res
      .status(400)
      .json({ message: "Token is expired or invalid please try again" });
  }

  user.password = password;

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.save();

  res.status(200).json({ message: "password saved successfully" });
};

const changepassword = async (req, res) => {
  const { oldpass, newpass } = req.body;
  const { id } = req.user;

  if (!oldpass || !newpass) {
    return res.status(400).json({ message: "All field are required" });
  }

  const user = await User.findById(id).select("+password");
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }

  const isPasswordValid = await user.comparePassword(oldpass);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "invalid password" });
  }

  user.password = newpass;
  await user.save();

  user.password = undefined;
  req.status(200).json({
    success: true,
    message: "password change successfully",
  });
};

const updateuser = async (req, res) => {
  const { fullname } = req.body;
  console.log("body id " , req.body);
  const { id } = req.params;
  console.log("'btfs" , id , fullname);

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }

  if (fullname) {
    user.fullname = fullname;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //removed the file from the local system
        fs.rm(`uploads/${req.file.filename}`);
      } else {
        console.log("result not getted");
      }


    } catch (error) {
      return res.status(500).json({ message: "file not found" });
    }
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "profile updated successfully",
  });
};

export {
  resister,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changepassword,
  updateuser,
};
