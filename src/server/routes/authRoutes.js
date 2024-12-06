import axios from "axios";

const express = require("express");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../auth/helpers");
const { createUser, getUserById, getUserByEmail } =
  require("../db/queries").default;
const { authenticate } = require("../middleware/authMiddleware"); // Import the authenticate middleware
const { createUserHandler, getUsersHandler } =
  require("../controllers/userController").default; // Import the handler
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User signup
router.post("/signup", async (req, res) => {
  const { name, email, password, phone, balance, trunks, role, inviteCode } =
    req.body;
  const ip_address = req.ip;

  try {
    // Validate role and invite code for admin
    if (role === "admin") {
      if (!inviteCode || inviteCode !== process.env.ADMIN_INVITE_CODE) {
        return res.status(403).json({ error: "Invalid admin invite code" });
      }
    }
    const hashedPassword = await hashPassword(password); // Hash password once
    const newUser = await createUser(
      name,
      email,
      hashedPassword,
      ip_address,
      phone,
      balance,
      trunks,
      role,
      inviteCode
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Signup failed. Please try again." });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid); // Debugging log
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging log
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token and role
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all users
router.get("/users", getUsersHandler);

export const updateUserInDB = async (data) => {
  const response = await axios.put(`/api/users/${data.id}`, data);
  return response.data; // Return the updated user from the backend
};

export const deleteUserInDB = async (id) => {
  await axios.delete(`/api/users/${id}`); // Delete user from DB
};

// Protected route to get user info
router.get("/user", authenticate, async (req, res) => {
  try {
    // Access user info from req.user (attached by authenticate middleware)
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/validateToken", authenticate, (req, res) => {
  // If we get here, the token is valid and the user is authenticated
  res.status(200).json({ message: "Token is valid", user: req.user });
});

module.exports = router;
