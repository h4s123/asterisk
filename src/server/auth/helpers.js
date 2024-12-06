const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Hash a password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare plain text password with hashed password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT
const generateToken = (user) => {
  const payload = { id: user.id, name: user.name };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secretKey, options);
};

// Verify JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { hashPassword, verifyPassword, generateToken, verifyToken };
