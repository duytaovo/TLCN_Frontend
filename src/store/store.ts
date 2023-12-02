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
import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import bannerReducer from "./banner/bannerSlice";
import commentsReducer from "./comment/commentsSlice";
import historyReducer from "./history/historyOrdersSlice";
import productsReducer from "./product/productsSlice";
import smartPhoneReducer from "./product/smartPhoneSlice";
import laptopReducer from "./product/laptopSlice ";
import ordersSlice from "./order/ordersSlice";
import tabletReducer from "./product/tabletSlice";
import smartWatchReducer from "./product/smartwatchSlice";
import brandsSlice from "./brand/brandsSlice";
import filterReducer from "./product/filterSlice";
import characteristicSlice from "./characteristic/characteristicSlice";
import categorysSlice from "./category/categorysSlice";

export const store = configureStore({
  reducer: {
    loading: appReducer,
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    user: userReducer,
    products: productsReducer,
    smartphone: smartPhoneReducer,
    filter: filterReducer,
    tablet: tabletReducer,
    laptop: laptopReducer,
    smartwatch: smartWatchReducer,
    search: searchSlice,
    banner: bannerReducer,
    comments: commentsReducer,
    historyOrders: historyReducer,
    order: ordersSlice,
    brand: brandsSlice,
    category: categorysSlice,
    characteristic: characteristicSlice,
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

