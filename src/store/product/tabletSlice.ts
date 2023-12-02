import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tabletService } from "src/services/product/tablet.service";
import {
  ListSmartPhone,
  SmartPhoneDetail,
} from "src/types/allProductsType.interface";
import { payloadCreator } from "src/utils/utils";

export const getTablets = createAsyncThunk(
  "tablet/getTablets",
  payloadCreator(tabletService.getAllProducts),
);

export const getDetailTablet = createAsyncThunk(
  "tablet/getDetailTablet",
  payloadCreator(tabletService.getProduct),
);

const datamau = {
  code: 0,
  message: "",
  data: {
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 2,
    data: [],
  },
};
type tablet = {
  data: ListSmartPhone[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
interface IProduct {
  tablet: tablet;
  tabletDetail: SmartPhoneDetail;
  filter: ListSmartPhone[];
}
const dataDetail: SmartPhoneDetail = {
  id: 3,
  monitor: "",
  operatingSystem: "",
  rearCamera: "",
  frontCamera: "",
  chip: "",
  sim: " ",
  battery: "",
  charging: "",
  networkSupport: "",
  productInfo: {
    brandId: 1,
    categoryId: 1,
    productId: 10,
    characteristicId: 7,
    productCode: "",
    name: "",
    description: "",
    design: " ",
    dimension: "",
    mass: 221.0,
    launchTime: 2023,
    accessories: "Tai nghe, sạc",
    productStatus: 100,
    lstProductTypeAndPrice: [
      {
        typeId: 5,
        ram: " ",
        storageCapacity: "",
        color: "",
        price: 0,
        salePrice: 0,
        quantity: 1000,
        depotId: 1,
      },
      {
        typeId: 6,
        ram: " ",
        storageCapacity: "",
        color: "",
        price: 0,
        salePrice: 0,
        quantity: 0,
        depotId: 1,
      },
    ],
    lstProductImageUrl: [],
    star: 4.9,
    totalReview: 100,
    slug: "",
  },
};
const data = {
  data: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
};
const initialState = {
  tablet: datamau,
  tabletDetail: dataDetail,
  filter: data,
};

const tabletSlice = createSlice({
  name: "tablet",
  initialState,
  reducers: {
    handleFilterStore: (state, action) => {
      state.filter.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTablets.fulfilled, (state, { payload }) => {
      state.tablet = payload.data;
    });
    builder.addCase(getDetailTablet.fulfilled, (state, { payload }) => {
      state.tabletDetail = payload.data.data;
    });
  },
});
export const { handleFilterStore } = tabletSlice.actions;

const tabletReducer = tabletSlice.reducer;
export default tabletReducer;

