import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "src/services/cart.service";
import { payloadCreator } from "src/utils/utils";
const data = {
  data: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
};
const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [];

const itemsBuy =
  localStorage.getItem("cartItemsBuy") !== null
    ? JSON.parse(localStorage.getItem("cartItemsBuy") || "")
    : [];
export const getProductByProductSlugId = createAsyncThunk(
  "cartItems/getProductByProductSlugId",
  payloadCreator(cartService.getProductByProductSlugId),
);
export const getProductByProductSlug = createAsyncThunk(
  "cartItems/getProductByProductSlugId",
  payloadCreator(cartService.getProductByProductSlug),
);

interface Cart {
  value: any[];
  valueBuy: any[];
  productBySlug: any;
}

const initialState: Cart = {
  value: items,
  valueBuy: itemsBuy,
  productBySlug: data,
};
export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e: any) => e.product_id === newItem.product_id,
      );
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e: any) => e.product_id !== newItem.product_id,
        );

        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            product_id: duplicate[0].product_id,
            slug: newItem.slug,
            color: newItem.color,
            price: newItem.price,
            salePrice: newItem.salePrice,
            name: newItem.name,
            typeId: newItem.typeId,
            depotId: newItem.depotId,
            quantityInDB: newItem.quantityInDB,
            image: newItem.image,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
            // id:
            //   state.value.length > 0
            //     ? state.value[state.value.length - 1].id + 1
            //     : 1,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },

    addItemBuy: (state, action) => {
      state.valueBuy = [...action.payload];
      localStorage.setItem(
        "cartItemsBuy",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const item = state.value.filter(
        (e: any) => e.product_id === newItem.product_id,
      );

      if (item.length > 0) {
        state.value = state.value.filter(
          (e: any) => e.product_id !== newItem.product_id,
        );

        state.value = [
          ...state.value,
          {
            id: item[0].id,
            product_id: item[0].product_id,
            slug: newItem.slug,
            color: newItem.color,
            price: newItem.price,
            salePrice: newItem.salePrice,
            name: newItem.name,
            typeId: newItem.typeId,
            depotId: newItem.depotId,
            quantityInDB: newItem.quantityInDB,
            image: newItem.image,
            quantity: newItem.quantity,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter(
        (e: any) => e.product_id !== item.product_id,
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );

      JSON.parse(localStorage.getItem("cartItems") || "");
    },
    clearCart: (state, action) => {
      state.value = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductByProductSlug.fulfilled, (state, { payload }) => {
      state.productBySlug = payload.data;
    });
  },
});

export const { addItem, removeItem, updateItem, clearCart, addItemBuy } =
  cartItemsSlice.actions;

const cartItemReducer = cartItemsSlice.reducer;
export default cartItemReducer;

