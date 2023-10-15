import { productService, ratingService } from "src/services";
import {
  // getAllProducts,
  handleFilterStore,
  getLocationProduct,
  getProductDetail,
  updateAllProduct,
} from "./productsSlice";
import { AppThunkDispatch } from "../store";

// export const getProducts = async(dispatch,id)=>{
//     let res = await commentService.getCommentByProductId(id)
//     dispatch(getAllProducts(res))
// }

export const HandleFilter = async (dispatch: AppThunkDispatch, data: any) => {
  dispatch(handleFilterStore(data));
};

export const updateAllProducts = async (
  dispatch: AppThunkDispatch,
  data: any
) => {
  dispatch(updateAllProduct(data));
};

// export const getAllProductByCategory = async (
//   dispatch: AppThunkDispatch,
//   category: any
// ) => {
//   let res = await productService.getProductByCategory(category);
//   dispatch(getAllProducts(res));
// };
//get by location and page and limit
export const getLocation = async (
  dispatch: AppThunkDispatch,
  location: any
) => {
  let res = await productService.getProductByLocation(location);
  dispatch(getLocationProduct(res));
};
export const getAllProductApi = async (dispatch: AppThunkDispatch) => {
  let res = await productService.getAllProducts();
  dispatch(getLocationProduct(res));
};

export const getProductDetailApi = async (
  dispatch: AppThunkDispatch,
  slug: string | undefined
) => {
  let res: any = await productService.getProductBySlug(slug || "");
  let resRating = await ratingService.getRating(res[0]?.id);
  dispatch(getProductDetail({ ...res[0], rating: resRating }));
};
