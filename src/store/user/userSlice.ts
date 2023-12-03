import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "src/services";
import { authApi } from "src/services/auth.service";
import { payloadCreator } from "src/utils/utils";

export const login = createAsyncThunk(
  "auth/login",
  payloadCreator(authApi.login),
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  payloadCreator(authApi.register),
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  payloadCreator(authApi.logout),
);

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  payloadCreator(userService.getUserById),
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  payloadCreator(authApi.getUser),
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  payloadCreator(userService.updatePassword),
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  payloadCreator(userService.updateProfile),
);

export const activeAccount = createAsyncThunk(
  "auth/activeAccount",
  payloadCreator(userService.activeAccount),
);

export const getCodeValidator = createAsyncThunk(
  "auth/getCodeValidator",
  payloadCreator(userService.sendCode),
);

type User = {
  id: number;
  fullName: string;
  phoneNumber: string;
  password?: string;
  email: string;
  gender: number;
  address: string;
  imageUrl?: string;
  level?: number;
  levelString?: string;
  isEnable: boolean;
};

interface IUser {
  name: string;
  accessToken: string;
  token: string;
  user: User[];
  profile: User;
  userWithId: any;
}

const initialState: IUser = {
  name: "admin",
  accessToken: "123",
  token: "",
  user: [],
  profile: {
    id: 1,
    address: "",
    email: "",
    fullName: "",
    gender: 0,
    imageUrl: "",
    level: 1,
    phoneNumber: "",
    isEnable: false,
  },

  userWithId: {},
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.data.accessToken;
      state.token = payload.data.data.token;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.profile = payload.data.data;
    });

    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.userWithId = payload.data.data;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

