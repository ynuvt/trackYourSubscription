import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { JWT } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please Sign In" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );
    const token = jwt.sign({ user: newUser[0]._id }, JWT, { expiresIn: "1h" });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        name: newUser[0].name,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) { 
            res.status(400).json({ message: "User does not exist, please Sign Up" })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" })
        } else {
            const token = jwt.sign({ user: existingUser._id }, JWT, { expiresIn: "1h" });
            res.status(200).json({
                success: true,
                message: "User signed in successfully",
                data: {
                    token,
                    name: existingUser.name,
                },
            });
        }
     }
    catch (error) {
        next(error)
    }
}

// export const signOut = (req, res,next) => { 
//     try { 
//         if()
//     } catch (error) {next(error)}
// }
