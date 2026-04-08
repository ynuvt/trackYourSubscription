import User from "../models/user.model.js";

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.params.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
