import http from "src/utils/http";

export const orderService = {
  postOrder(data: any) {
    return http.post(`/orders/`, data);
  },
};
