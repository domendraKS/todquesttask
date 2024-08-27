import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../middlewares/errorHandler.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    return next(errorHandler(400, "Please fill all the required field."));
  }

  //validation
  if (password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 character"));
  }

  try {
    //check email exist or not
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return next(errorHandler(409, "Email already in use, please log in."));
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    const { password: hashedPassword, ...rest } = savedUser._doc;

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: rest,
    });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return next(errorHandler(400, "Please fill all the required field."));
  }

  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Email is not registered"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credential"));
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.COOKIE_SECRET_KEY
    );

    const { password: hashedPassword, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie("userTokenTodquest", token, { httpOnly: true })
      .json({
        success: true,
        message: "Login Successfully",
        user: rest,
      });
  } catch (error) {
    return next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("userTokenTodquest")
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return next(error);
  }
};
