import User from "../models/User.js";
import Organisation from "../models/Organisation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * REGISTER ORGANISATION (Public Signup)
 */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      organisationName,
      organisationType,
    } = req.body;

    // 1️⃣ Check if user exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // 2️⃣ Create Organisation
    const organisation = await Organisation.create({
      name: organisationName,
      type: organisationType,
    });

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create User (force role)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "organisation", // 🔐 force secure role
      organisationId: organisation._id,
    });

    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "Organisation created successfully",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * LOGIN
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user + populate organisation
    const user = await User.findOne({ email }).populate("organisationId");

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        organisationId: user.organisationId?._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user.toObject();

    res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
