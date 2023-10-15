import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getHistoryOrders = createAsyncThunk(
  "historyOrders/getHistoryOrders",
  payloadCreator(historyService.getHistoryOrderByPhone)
);

export const historyOrders = createSlice({
  name: "historyOrders",
  initialState: {
    historyOrder: {
      data: [],
    },
  },

  reducers: {
    // getHistoryOrder: (state, action) => {
    //   state.historyOrder.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getHistoryOrders.fulfilled, (state, { payload }) => {
      state.historyOrder.data = payload;
    });
  },
});
// export const { getHistoryOrder } = historyOrders.actions;
const historyReducer = historyOrders.reducer;
export default historyReducer;
