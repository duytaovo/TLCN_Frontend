import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getPurchases = createAsyncThunk(
  "orders/getPurchases",
  payloadCreator(orderService.getPurchases)
);

export const updatePurchase = createAsyncThunk(
  "orders/updatePurchase",
  payloadCreator(orderService.updatePurchase)
);

export const deletePurchases = createAsyncThunk(
  "orders/deletePurchases",
  payloadCreator(orderService.deletePurchase)
);

export const buyPurchases = createAsyncThunk(
  "orders/buyPurchases",
  payloadCreator(orderService.buyProducts)
);

const order =
  localStorage.getItem("order") !== null
    ? JSON.parse(localStorage.getItem("order") || "")
    : {};
export const orders = createSlice({
  name: "orders",
  initialState: {
    order: {
      //data: [],
      data: order,
    },
  },
  reducers: {
    postOrder: (state, action) => {
      state.order.data = action.payload;
      const orderData = JSON.stringify(action.payload);
      if (!action.payload.payment.paid) {
        localStorage.setItem("order", orderData);
      }
    },
  },
});
export const { postOrder } = orders.actions;
export default orders.reducer;
