import { query as _query } from "./db";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords

// Create a new user
const createUser = async (
  name,
  email,
  hashedPassword,
  ip_address,
  phone,
  balance,
  trunks,
  role = "user"
) => {
  const query = `
    INSERT INTO users (name, email, password, ip_address, phone, balance, trunks ,role)
    VALUES ($1, $2, $3, $4, $5, $6, $7 , $8)
    RETURNING *;
  `;
  const values = [
    name,
    email,
    hashedPassword,
    ip_address,
    phone,
    balance,
    trunks,
    role,
  ];
  const result = await _query(query, values);
  return result.rows[0];
};

// Fetch all users
const getUsers = async () => {
  const result = await _query("SELECT * FROM users;");
  return result.rows;
};

// Fetch a single user by ID
const getUserById = async (id) => {
  const query = `
        SELECT * FROM users WHERE id = $1;
    `;
  const values = [id];
  const result = await _query(query, values);
  return result.rows[0];
};

// Fetch a user by email (added for password reset)
const getUserByEmail = async (email) => {
  console.log("Fetching user by email:", email); // Debugging log
  const query = `SELECT * FROM users WHERE email = $1;`;
  const values = [email];
  const result = await _query(query, values);
  console.log("Query result:", result.rows); // Debugging log
  return result.rows[0];
};

// Update a user's information
const updateUser = async (id, updateData) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  // Construct the SET clause dynamically
  const setClause = fields
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  const query = `
        UPDATE users
        SET ${setClause}
        WHERE id = $1
        RETURNING *;
    `;
  const result = await _query(query, [id, ...values]);
  return result.rows[0];
};

// Delete a user
const deleteUser = async (id) => {
  const query = `
        DELETE FROM users WHERE id = $1;
    `;
  const values = [id];
  await _query(query, values);
};

// Create a password reset token
const createPasswordResetToken = async (userId, expiresAt) => {
  const token = randomBytes(32).toString("hex"); // Generate a secure token
  const query = `
        INSERT INTO password_reset_tokens (user_id, token, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
  const values = [userId, token, expiresAt];
  const result = await _query(query, values);
  return { token, data: result.rows[0] };
};

// Get a password reset token
const getPasswordResetToken = async (token) => {
  const query = `
        SELECT * FROM password_reset_tokens
        WHERE token = $1 AND expires_at > NOW();
    `;
  const values = [token];
  const result = await _query(query, values);
  return result.rows[0];
};

// Delete all reset tokens for a user
const deleteResetTokensForUser = async (userId) => {
  const query = `DELETE FROM password_reset_tokens WHERE user_id = $1;`;
  const values = [userId];
  await _query(query, values);
};

// Export all functions
export default {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail, // Added
  updateUser,
  deleteUser,
  createPasswordResetToken, // Added
  getPasswordResetToken, // Added
  deleteResetTokensForUser, // Added
};
