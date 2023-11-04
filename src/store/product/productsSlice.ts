import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getAllProductByCategory = createAsyncThunk(
  "products/getAllProductByCategory",
  payloadCreator(productService.getProductByCategory)
);

// export const getLaptop = createAsyncThunk(
//   "products/getLaptop",
//   payloadCreator(productService.getLaptop)
// );

interface State {
  allProducts: {
    data: [];
  };
  oneProduct: {
    data: string;
  };
  filter: {
    data: [];
  };
  location: {
    data: [];
  };
  productDetail: {
    data: {
      article: string[];
      info: string[];
      gallery: string[];
      title: string[];
      img: string;
      rating: any;
      id: number;
    };
  };
  laptop: [];
}

const initialState: State = {
  allProducts: {
    data: [],
  },
  oneProduct: {
    data: "",
  },
  filter: {
    data: [],
  },
  location: {
    data: [],
  },
  productDetail: {
    data: {
      article: [],
      info: [],
      gallery: [],
      title: [],
      img: "",
      rating: [],
      id: 0,
    },
  },
  laptop: [],
};

export const products = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    // getAllProducts: (state, action) => {
    //   state.allProducts.data = action.payload;
    // },
    updateAllProduct: (state, action) => {
      state.allProducts.data = action.payload;
    },
    getOneProduct: (state, action) => {
      state.oneProduct.data = action.payload;
    },
    handleFilterStore: (state, action) => {
      state.filter.data = action.payload;
    },
    getLocationProduct: (state, action) => {
      state.location.data = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetail.data = action.payload;
    },
    updateDiscussRating: (state, action) => {
      const rating: any = state.productDetail.data.rating.find(
        (rating: any) => rating.id === action.payload.idRating
      );
      if (rating) {
        const res = rating.discuss.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductByCategory.fulfilled, (state, action) => {
      state.allProducts.data = action.payload.data;
    });
  },
});
export const {
  updateDiscussRating,
  // getAllProducts,
  getOneProduct,
  handleFilterStore,
  getLocationProduct,
  getProductDetail,
  updateAllProduct,
} = products.actions;

const productsReducer = products.reducer;
export default productsReducer;
