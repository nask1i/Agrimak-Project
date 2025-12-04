import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { UserHelpers } from "./Utils";

const storedUSer = UserHelpers.getLogedInUser();

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: storedUSer ? storedUSer : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
