import { searchService } from "../../services/search.service";
import { getResultSearch, removeResultSearch } from "./searchSlice";
export const getResult = async (dispatch: any, value: any) => {
  let res = await searchService.getResultSearchApi(value);
  dispatch(getResultSearch(res));
};
export const removeResult = (dispatch: any) => {
  dispatch(removeResultSearch());
};
