import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer";

//Register new customer
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, picture_path } = req.body;
    const salt = await bcrypt.genSalt();
    const passwd = await bcrypt.hash(password, salt);
    const newCustomer = new Customer({
      first_name,
      last_name,
      email,
      password: passwd,
      picture_path,
      sold,
      valid_account,
      active: true,
    });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//login a customer
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email: email });
    if (!customer) {
      return res.status(400).json({ message: "customer does not exist." });
    }
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET);
    delete customer.password;
    res.status(200).json({ token, customer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
