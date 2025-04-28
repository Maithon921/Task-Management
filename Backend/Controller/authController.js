import bcrypt from "bcryptjs";
import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
import Task from "../Model/TaskModel.js";

export const register = async (req, res) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User Created" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...detail } = user._doc;
    res.status(200).json({ token, detail });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Task.deleteMany({ userId: userId });

    res.status(200).json({ message: "User and it's Data deleted", user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
