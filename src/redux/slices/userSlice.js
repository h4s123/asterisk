import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInUser: {
    id: "1",
    name: "John Doe",
    ip: "192.168.1.1",
    phone: "123-456-7890",
    balance: 100,
    trunks: ["Trunk1", "Trunk3"],
  },
  users: [
    {
      id: "2",
      name: "Jane Smith",
      ip: "192.168.1.2",
      phone: "987-654-3210",
      balance: 200,
      trunks: ["Trunk2", "Trunk4"],
    },
  ],
};


export const fetchUsersFromAPI = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:5000/auth/users"); // Replace with your actual API endpoint
  return response.data; // Assumes API response is the array of users
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload); // Correctly push new user to the users array
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload); // Remove user by ID
    },
    updateBalance: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.balance = action.payload.value; // Update balance
      }
    },
    reorderUser: (state, action) => {
      const { id, direction } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < state.users.length) {
          const temp = state.users[index];
          state.users[index] = state.users[targetIndex];
          state.users[targetIndex] = temp;
        }
      }
    },
    updateTrunks: (state, action) => {
      const { id, trunks } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.trunks = trunks; // Update trunks for the user
      }
    },
    updateLoggedInUser: (state, action) => {
      state.loggedInUser = { ...state.loggedInUser, ...action.payload }; // Update logged-in user's data
    },
    fetchUsersRequest: (state) => {},
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload; // Set fetched users
      state.error = null;
    },
    fetchUsersFailure: (state, action) => {
      state.error = action.payload; // Set error message
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersFromAPI.fulfilled, (state, action) => {
      state.users = action.payload; // Populate users from API response
    });
  },
  
});

export const {
  addUser,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUser,
  updateBalance,
  reorderUser,
  updateTrunks,
  updateLoggedInUser,
} = userSlice.actions;
export default userSlice.reducer;
