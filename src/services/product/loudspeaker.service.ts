import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const loudSpeakerService = {
  getLoudSpeakers(params: any) {
    return httpNew.get<SuccessResponse<any>>("/product/loudSpeaker", {
      params,
    });
  },

  getDetailLoudSpeaker(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/product/loudSpeaker/${params}`);
  },
};
