import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { smartwatchService } from "src/services/product/smartwatch.service";
import {
  ListSmartPhone,
  SmartPhoneDetail,
} from "src/types/allProductsType.interface";
import { payloadCreator } from "src/utils/utils";

export const getSmartwatchs = createAsyncThunk(
  "smartwatch/getSmartwatchs",
  payloadCreator(smartwatchService.getAllProducts)
);

export const getDetailSmartWatch = createAsyncThunk(
  "smartwatch/getDetailSmartWatch",
  payloadCreator(smartwatchService.getProduct)
);
const data = {
  data: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
};
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
type smartwatch = {
  data: ListSmartPhone[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
interface IProduct {
  smartwatch: smartwatch;
  smartwatchDetail: SmartPhoneDetail;
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

const initialState = {
  smartWatch: datamau,
  smartWatchDetail: dataDetail,
  filter: [],
};

const smartWatchSlice = createSlice({
  name: "smartwatch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSmartwatchs.fulfilled, (state, { payload }) => {
      state.smartWatch = payload.data;
    });
    builder.addCase(getDetailSmartWatch.fulfilled, (state, { payload }) => {
      state.smartWatchDetail = payload.data.data;
    });
  },
});

const smartWatchReducer = smartWatchSlice.reducer;
export default smartWatchReducer;
