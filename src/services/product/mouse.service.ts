import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const mouseService = {
  getMouses(params: any) {
    return httpNew.get<SuccessResponse<any>>("/product/mouse", {
      params,
    });
  },

  getDetailMouse(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/product/mouse/${params}`);
  },
};
