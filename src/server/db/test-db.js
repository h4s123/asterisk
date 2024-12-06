const pool = require("./db");
const { createUser, getUsers, getUserById, updateUser, deleteUser } =
  require("./queries").default; // Import your query functions

(async () => {
  try {
    console.log("Creating a user...");
    const newUser = await createUser(
      "John Doe",
      "192.168.1.1",
      "123-456-7890",
      100
    );
    console.log("User created:", newUser);

    console.log("\nFetching all users...");
    const users = await getUsers();
    console.log("All users:", users);

    console.log("\nFetching user by ID...");
    const user = await getUserById(newUser.id);
    console.log("Fetched user:", user);

    console.log("\nUpdating user...");
    const updatedUser = await updateUser(newUser.id, { balance: 150 });
    console.log("Updated user:", updatedUser);

    console.log("\nDeleting user...");
    await deleteUser(newUser.id);
    console.log("User deleted successfully.");

    console.log("\nFetching all users after deletion...");
    const usersAfterDeletion = await getUsers();
    console.log("All users:", usersAfterDeletion);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end(); // Close the pool
  }
})();
