import { Router } from "express";
// import * as userController from "../controllers/userController";
// const {
//   createUserHandler, getUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler,
// } = userController;
import { requestPasswordReset, resetPassword } from "../controllers/passwordResetController";
import {createUserHandler , getUserByIdHandler , getUsersHandler , updateUserHandler , deleteUserHandler} from '../controllers/userController'

const router = Router();

// User routes
router.post("/users", createUserHandler); // Create user
router.get("/users", getUsersHandler); // Get all users
router.get("/users/:id", getUserByIdHandler); // Get user by ID
router.put("/users/:id", updateUserHandler); // Update user
router.delete("/users/:id", deleteUserHandler); // Delete user

// Password reset routes
router.post("/password-reset/request", requestPasswordReset);
router.post("/password-reset/reset", resetPassword);

export default router;
