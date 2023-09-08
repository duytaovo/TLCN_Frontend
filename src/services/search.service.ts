import http from "src/utils/http";

export const searchService = {
  getResultSearchApi(value: string) {
    return http.get(`/products?q=${value}`);
  },
};
