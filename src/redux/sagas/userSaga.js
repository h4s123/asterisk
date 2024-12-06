import { takeLatest, put, call } from "redux-saga/effects";
import { addUser, fetchUsersFailure, fetchUsersFromAPI, fetchUsersSuccess, updateBalance, updateTrunks } from "../slices/userSlice";
import axios from "axios";
import { deleteUserInDB, updateUserInDB } from "@/server/routes/authRoutes";

// Mock API call
const mockApiCall = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 1000));

function fetchUsersAPI() {
  return axios.get("http://localhost:5000/auth/users"); // Replace with your actual API endpoint
}

// function* fetchUsersSaga() {
//   try {
//     const response = yield call(fetchUsersAPI);
//     const users = response.data;
//     yield put({ type: "users/fetchUsersSuccess", payload: users });
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     yield put({ type: "users/fetchUsersFailure", error });
//   }
// }
function* fetchUsersSaga() {
  try {
    const response = yield call(fetchUsersAPI);
    yield put(fetchUsersSuccess(response.data)); // Dispatch success with the data
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    yield put(fetchUsersFailure(error.message)); // Dispatch failure with the error
  }
}


// Saga: Handle adding a user
function* handleAddUser(action) {
  try {
    const newUser = yield call(mockApiCall, action.payload);
    yield put(addUser(newUser));
  } catch (error) {
    console.error("Add user failed", error);
  }
}

// Saga: Handle updating balance
function* handleUpdateBalance(action) {
  try {
    const updatedData = yield call(updateUserInDB, action.payload); // Call backend to update DB
    yield put(updateBalance(updatedData)); // Update Redux state with the new balance
  } catch (error) {
    console.error("Update balance failed", error);
  }
}

function* handleUpdateTrunks(action) {
  try {
    const updatedData = yield call(updateUserInDB, action.payload); // Update trunks in DB
    yield put(updateTrunks(updatedData)); // Update Redux state
  } catch (error) {
    console.error("Update trunks failed", error);
  }
}

function* handleDeleteUser(action) {
  try {
    yield call(deleteUserInDB, action.payload); // Delete user from DB
    yield put(deleteUser(action.payload)); // Update Redux state to remove user
  } catch (error) {
    console.error("Delete user failed", error);
  }
}



// Watcher Saga
export default function* userSaga() {
  // yield takeLatest("users/fetchUsers", fetchUsersSaga);
  yield takeLatest(fetchUsersFromAPI.type, fetchUsersSaga); // Listen for the correct action type
  yield takeLatest("users/addUserAsync", handleAddUser);
  yield takeLatest("users/updateBalanceAsync", handleUpdateBalance);
  yield takeEvery('users/updateTrunks', handleUpdateTrunks); // Watch for trunk update action
  yield takeEvery('users/deleteUser', handleDeleteUser); // Watch for delete user action

}
