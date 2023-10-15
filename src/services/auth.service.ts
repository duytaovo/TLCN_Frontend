import http from "src/utils/http";

export const authApi = {
  login(data: any) {
    return http.post("/auth/login", data);
  },
  register(data: any) {
    return http.post("/auth/register", data);
  },
  logout() {
    return http.post("/auth/logout-user", {});
  },
};
