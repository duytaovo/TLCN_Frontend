import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "src/services/auth.service";
import { payloadCreator } from "src/utils/utils";

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

interface DecodedToken {
  userId: number;
  permissions: number;
  username: string;
  userUuid: string;
}
const a = {
  id: 3,
  fullName: null,
  phoneNumber: "0352811529",
  password: "$2a$10$ZGDn9NMoM4VtF.777BatRu49zzV3w4UpagNGHABhxLVTaTGdySwui",
  email: "duytaovo@gmail.com",
  gender: null,
  address: "số 3 Hồng Đức",
  imageUrl: null,
  level: 1,
  levelString: "Bronze",
};
type User = {
  id: number;
  fullName: null;
  phoneNumber: string;
  password: string;
  email: string;
  gender: null;
  address: string;
  imageUrl: null;
  level: number;
  levelString: string;
};

interface IUser {
  name: string;
  accessToken: string;
  token: string;
  user: User[];
}

const initialState: IUser = {
  name: "admin",
  accessToken: "123",
  token: "",
  user: [],
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
    // builder.addCase(addUser.fulfilled, (state, { payload }) => {
    //   state.user = payload.data;
    // });

    // builder.addCase(getDetailUser.fulfilled, (state, { payload }) => {
    //   state.user = payload.data;
    // });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
