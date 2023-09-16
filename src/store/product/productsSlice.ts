import { createSlice } from "@reduxjs/toolkit";

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
      rating: number[];
      id: number;
    };
  };
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
};

export const products = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts.data = action.payload;
    },
    updateAllProduct: (state, action) => {
      state.allProducts.data = action.payload;
    },
    getOneProduct: (state, action) => {
      state.oneProduct.data = action.payload;
    },
    handleFilter: (state, action) => {
      state.filter.data = action.payload;
    },
    getLocationProduct: (state, action) => {
      state.location.data = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetail.data = action.payload;
    },
    updateDiscussRating: (state: any, action) => {
      const rating: any = state.productDetail.data.rating.find(
        (rating: any) => rating.id === action.payload.idRating
      );
      if (rating) {
        const res = rating.discuss.push(action.payload);
      }
    },
  },
});
export const {
  updateDiscussRating,
  getAllProducts,
  getOneProduct,
  handleFilter,
  getLocationProduct,
  getProductDetail,
  updateAllProduct,
} = products.actions;

export default products.reducer;
