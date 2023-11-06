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

export const getSmartPhonesWithPageNumber = createAsyncThunk(
  "smartPhone/getSmartPhonesWithPageNumber",
  payloadCreator(smartphoneService.getProductWithPage)
);

export const getSmartPhonesWithPageNumberSize = createAsyncThunk(
  "smartPhone/getSmartPhonesWithPageNumberSize",
  payloadCreator(smartphoneService.getProductWithPageSize)
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

type SmartPhone = {
  data: ListSmartPhone[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
interface IProduct {
  smartPhone: SmartPhone;
  smartPhoneDetail: SmartPhoneDetail;
  filter: ListSmartPhone[];
}
const dataDetail = {
  id: 8,
  monitor: "6.7 - Tần số quét 60 Hz",
  operatingSystem: "iOS",
  rearCamera: "Chính 48 MP & Phụ 12 MP",
  frontCamera: "12 MP",
  chip: "Apple A16 Bionic 6 nhân",
  sim: "1 Nano SIM & 1 eSIM",
  battery: "4383 mAh",
  charging: " 20 W",
  networkSupport: "5G",
  productInfo: {
    brandId: 1,
    categoryId: 1,
    productId: 8,
    characteristicId: 1,
    totalReview: 0,
    star: 0,
    productCode: "xQzA1slnwb",
    name: "",
    description: "",
    design: "",
    dimension: "",
    mass: 201.0,
    launchTime: 2023,
    accessories: "",
    productStatus: 100,
    lstProductTypeAndPrice: [
      {
        typeId: 7,
        ram: "6 GB",
        storageCapacity: "128 GB",
        color: "Hồng nhạt",
        price: 25600000.0,
        salePrice: 253000000.0,
      },
      {
        typeId: 8,
        ram: "6GB",
        storageCapacity: "256GB",
        color: "Đen ",
        price: 28500000.0,
        salePrice: 28000000.0,
      },
    ],
    lstProductImageUrl: [
      "https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-128gb-hong-2.jpg",
      "https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-128gb-hong-3.jpg",
    ],
  },
};
const initialState: IProduct = {
  smartPhone: data,
  smartPhoneDetail: dataDetail,
  filter: [],
};
const smartPhoneSlice = createSlice({
  name: "smartPhone",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSmartPhones.fulfilled, (state, { payload }) => {
      console.log(payload.data.data);
      state.smartPhone = payload.data.data;
    });
    builder.addCase(getDetailPhone.fulfilled, (state, { payload }) => {
      state.smartPhoneDetail = payload.data.data;
    });
  },
});

const smartPhoneReducer = smartPhoneSlice.reducer;
export default smartPhoneReducer;
