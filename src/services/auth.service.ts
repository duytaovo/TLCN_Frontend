import http, { httpNew } from "src/utils/http";

export const authApi = {
  login(data: any) {
    return httpNew.post("/authenticate", data);
  },
  register(data: any) {
    return httpNew.post("/user/sign-up", data);
  },
  logout() {
    return http.post("/auth/logout-user", {});
  },
};
