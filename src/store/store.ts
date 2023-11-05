import {
  AnyAction,
  Store,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import appReducer from "src/app.slice";
import productModalReducer from "./product-modal/productModalSlice";
import userReducer from "./user/userSlice";
import searchSlice from "./search/searchSlice";
import historyOrdersSlice from "./history/historyOrdersSlice";
import orderSlice from "./order/orderSlice";
import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import bannerReducer from "./banner/bannerSlice";
import commentsReducer from "./comment/commentsSlice";
import historyReducer from "./history/historyOrdersSlice";
import productsReducer from "./product/productsSlice";
import smartPhoneReducer from "./product/smartPhoneSlice";

export const store = configureStore({
  reducer: {
    loading: appReducer,
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    user: userReducer,
    products: productsReducer,
    smartphone: smartPhoneReducer,
    search: searchSlice,
    order: orderSlice,
    banner: bannerReducer,
    comments: commentsReducer,
    historyOrders: historyReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
});

// trích xuất type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 1. Get the root state's type from reducers

// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// 3. Create a type for store using RootState and Thunk enabled dispatch
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

export default store;
