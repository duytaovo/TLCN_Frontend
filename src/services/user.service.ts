import http from "src/utils/http";

export const userService = {
  getUserById(id: string) {
    return http.get(`/users?id=${id}`);
  },

  editUser(phone: string, data: string) {
    return http.put(`/users/${phone}`, data);
  },
};
