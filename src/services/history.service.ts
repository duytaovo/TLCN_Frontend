import http, { httpNew } from "src/utils/http";

export const historyService = {
  getHistoryOrder(params: any) {
    return httpNew.get(`/order`, { params });
  },
  updateHistoryOrder(id: string, data: string) {
    return http.patch(`/orders/${id}`, data);
  },
};
