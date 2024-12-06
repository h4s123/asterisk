import queries from "../db/queries";
const { createUser, getUsers, getUserById, updateUser, deleteUser } = queries;

// Handle creating a new user
const createUserHandler = async (req, res) => {
  const { name, email, ip, phone, balance, password, trunks } = req.body; // Add password here

  if (!password) {
    return res.status(400).json({ error: "Password is required" }); // Ensure password is provided
  }

  try {
    const newUser = await createUser(
      name,
      email,
      ip,
      phone,
      balance,
      password,
      trunks
    ); // Pass password here
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle fetching all users
const getUsersHandler = async (_req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle fetching a user by ID
const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle updating a user
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await updateUser(id, updateData); // Update DB
    res.status(200).json(updatedUser); // Return updated user to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle deleting a user
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id); // Delete user from DB
    res.status(204).send(); // No content, user deleted
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
};
