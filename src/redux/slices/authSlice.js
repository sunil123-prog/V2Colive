import { createSlice } from "@reduxjs/toolkit";

let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
  localStorage.removeItem("user");
}

const initialState = {
  loggedInUser: userFromStorage, 
  registeredUser: null,
  termsAccepted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("user"); 
    },
    registerUser: (state, action) => {
      state.registeredUser = action.payload;
    },
    termsAccepted: (state) => {
      state.termsAccepted = true;
    },
  },
});

export const { loggedInUser, logoutUser, registerUser, termsAccepted } =
  authSlice.actions;
export default authSlice.reducer;
