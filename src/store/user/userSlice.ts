import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "src/utils/utils";
import jwtDecode from "jwt-decode";
import { getAccessTokenFromLS } from "src/utils/auth";
import { toast } from "react-toastify";
import http from "src/utils/http";
import { authApi } from "src/services/auth.service";
import { userService } from "src/services";

export const login = createAsyncThunk(
  "auth/login",
  payloadCreator(authApi.login)
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  payloadCreator(authApi.register)
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  payloadCreator(authApi.logout)
);

export const updateMe = createAsyncThunk(
  "auth/updateMe",
  payloadCreator(userService.updateProfile)
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  payloadCreator(userService.getProfile)
);

interface DecodedToken {
  userId: number;
  permissions: number;
  username: string;
  userUuid: string;
}

interface IUser {
  name: string;
  accessToken: string;
  permission: number;
  isActiveEdit?: boolean;
  userUuid: any;
  userId: number;
  profile: any;
}

let decodeToken: DecodedToken;
export const isAccessTokenExpired = (): any => {
  if (!getAccessTokenFromLS() || getAccessTokenFromLS() == "") {
    return "0";
  }
  try {
    decodeToken = jwtDecode(getAccessTokenFromLS() || "") as DecodedToken;
    const decoded = {
      permission: decodeToken.permissions,
      userId: decodeToken.userId,
      userUuid: decodeToken.userUuid,
    };
    return decoded;
  } catch (error) {
    toast.error("Token không đúng định dạng");
    return "";
  }
};

const initialState: IUser = {
  name: "admin",
  accessToken: "123",
  permission: isAccessTokenExpired().permission || 0,
  isActiveEdit: false,
  userId: isAccessTokenExpired().userId | 0,
  userUuid: isAccessTokenExpired().userUuid,
  profile: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: { payload: any }) => {
      state.permission = action?.payload?.permission;
      state.userId = action?.payload?.userId;
      state.userUuid = action?.payload?.userUuid;
    },

    toggleActiveEdit: (state) => {
      state.isActiveEdit = !state.isActiveEdit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;
    });
    builder.addCase(updateMe.fulfilled, (state, { payload }) => {
      state.profile = payload.data;
      localStorage.setItem("user", JSON.stringify(state.profile));
    });
  },
});

export const { updateUser, toggleActiveEdit } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
