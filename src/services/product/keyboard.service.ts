import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const keyboardService = {
  getKeyboards(params: any) {
    return httpNew.get<SuccessResponse<any>>("/product/keyboard", {
      params,
    });
  },

  getDetailKeyboard(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/product/keyboard/${params}`);
  },
};
