import http from "src/utils/http";

export const commentService = {
  getCommentByProductId(id: string) {
    return http.get(`/comments?productId=${id}`);
  },

  postComment(data: any) {
    return http.post(`/comments/`, data);
  },
};
