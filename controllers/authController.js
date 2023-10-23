import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

//Register new user
export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      picture_path,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwd = await bcrypt.hash(password, salt);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: passwd,
      picture_path,
      sold,
      valid_account,
      active: true,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
