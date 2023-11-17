import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getCommentByProductId = createAsyncThunk(
  "comments/getCommentByProductId",
  payloadCreator(commentService.getCommentByProductId)
);

export const getCommentById = createAsyncThunk(
  "comments/getCommentById",
  payloadCreator(commentService.getCommentById)
);

export const postComments = createAsyncThunk(
  "comments/postComments",
  payloadCreator(commentService.postComment)
);

export const putComments = createAsyncThunk(
  "comments/putComments",
  payloadCreator(commentService.putComment)
);
export const uploadManyImages = createAsyncThunk(
  "comments/uploadManyImages",
  payloadCreator(commentService.uploadManyImages)
);

const CommentDetail = {
  code: 200,
  message: "Requested completed!",
  data: {
    id: 12,
    userId: 2,
    username: "ADMIN",
    userAvatar: "test",
    star: 3,
    comment: "abc",
    feedbackFilesUrl: [
      "https://techstore2023.s3.ap-southeast-1.amazonaws.com/1700214917749e6e163c1-5037-4cbb-a30d-2156e2a0df46-aaa.jpeg",
    ],
  },
};

interface IState {
  commentByProduct: [];
  commentById: {};
}

const initialState = {
  commentByProduct: [],
  commentById: CommentDetail,
};
export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentByProductId.fulfilled, (state, { payload }) => {
      state.commentByProduct = payload.data;
    });
    builder.addCase(getCommentById.fulfilled, (state, { payload }) => {
      state.commentById = payload.data;
    });
    // builder.addCase(postComments.fulfilled, (state, { payload }) => {
    //   state.comment = [...state.comment, payload.data];
    // });
  },
});
const commentsReducer = comments.reducer;
export default commentsReducer;
