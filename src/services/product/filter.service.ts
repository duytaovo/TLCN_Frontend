import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const filterService = {
  getSort() {
    return httpNew.get<SuccessResponse<any>>("/sort", {});
  },

  getFilter(params: string) {
    return httpNew.get<SuccessResponse<any[]>>(`/filter`, { params });
  },

  getSeatch(params: string) {
    return httpNew.get<SuccessResponse<any[]>>(`/search`, { params });
  },
};
