import http from "src/utils/http";

export const historyService = {
  getHistoryOrderByPhone(value: string) {
    return http.get(`/orders?customer.phone=${value}`);
  },
  updateHistoryOrder(id: string, data: string) {
    return http.patch(`/orders/${id}`, data);
  },
};
