import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { smartphoneService } from "src/services/product/smartphone.service";
import {
  ListSmartPhone,
  SmartPhoneDetail,
} from "src/types/allProductsType.interface";
import { payloadCreator } from "src/utils/utils";

export const getSmartPhones = createAsyncThunk(
  "smartPhone/getSmartPhones",
  payloadCreator(smartphoneService.getAllProducts)
);

export const getDetailPhone = createAsyncThunk(
  "smartPhone/getDetailPhone",
  payloadCreator(smartphoneService.getProduct)
);
const data = {
  data: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
};

export type SmartPhone = {
  data: ListSmartPhone[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
interface IProduct {
  smartPhone: SmartPhone;
  smartPhoneDetail: SmartPhoneDetail;
  filter: SmartPhone;
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

const initialState: IProduct = {
  smartPhone: data,
  smartPhoneDetail: dataDetail,
  filter: data,
};

const smartPhoneSlice = createSlice({
  name: "smartPhone",
  initialState,
  reducers: {
    handleFilterStore: (state, action) => {
      state.filter.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSmartPhones.fulfilled, (state, { payload }) => {
      state.smartPhone = payload.data;
    });
    builder.addCase(getDetailPhone.fulfilled, (state, { payload }) => {
      state.smartPhoneDetail = payload.data.data;
    });
  },
});
export const { handleFilterStore } = smartPhoneSlice.actions;
const smartPhoneReducer = smartPhoneSlice.reducer;
export default smartPhoneReducer;
