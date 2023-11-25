import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "src/services/brand.service";
import { payloadCreator } from "src/utils/utils";

export const getBrand = createAsyncThunk(
  "brand/getBrand",
  payloadCreator(brandService.getBrands)
);

export const getDetailBrand = createAsyncThunk(
  "brand/getDetailBrand",
  payloadCreator(brandService.getDetailBrand)
);

export const brand = createSlice({
  name: "brand",
  initialState: {
    brand: {
      id: 0,
      name: "",
      address: "",
      imageUrl: "",
    },
  },
  reducers: {
    postOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailBrand.fulfilled, (state, { payload }) => {
      console.log(payload.data);
      state.brand = payload.data.data;
    });
  },
});
export default brand.reducer;
