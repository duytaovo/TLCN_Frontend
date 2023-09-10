import { createSlice } from "@reduxjs/toolkit";

export const comments = createSlice({
  name: "comments",
  initialState: {
    comment: {
      data: [],
    },
  },
  reducers: {
    getComment: (state, action) => {
      state.comment.data = action.payload;
    },
    postComment: (state: any, action: any) => {
      state.comment.data = [...state.comment.data, action.payload];
    },
  },
});
export const { getComment, postComment } = comments.actions;
export default comments.reducer;
