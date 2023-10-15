import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getComments = createAsyncThunk(
  "comments/getComments",
  payloadCreator(commentService.getCommentByProductId)
);

export const postComments = createAsyncThunk(
  "comments/postComments",
  payloadCreator(commentService.postComment)
);

interface IState {
  comment: {
    data: string[];
  };
}

const initialState: IState = {
  comment: {
    data: [],
  },
};
export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // getComment: (state, action) => {
    //   state.comment.data = action.payload;
    // },
    // postComment: (state: any, action: any) => {
    //   state.comment.data = [...state.comment.data, action.payload];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.comment.data = payload.data;
    });
    builder.addCase(postComments.fulfilled, (state, { payload }) => {
      state.comment.data = [...state.comment.data, payload];
    });
  },
});
const commentsReducer = comments.reducer;
export default commentsReducer;
