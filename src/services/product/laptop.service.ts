import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const laptopService = {
  getLaptops(params: any) {
    return httpNew.get<SuccessResponse<any>>("/product/laptop", {
      params,
    });
  },

  getDetailLaptop(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/product/laptop/${params}`);
  },
};
