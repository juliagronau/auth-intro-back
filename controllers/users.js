import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json(token);
      } else {
        res.status(403).json("login data incorrect!");
      }
    } else {
      res.status(404).json("user not found!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const email = req.user;
    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
