import { commentService } from "src/services";
import { getComment, postComment } from "./commentsSlice";

export const getComments = async (dispatch: any, id: any) => {
  let res: any = await commentService.getCommentByProductId(id);
  dispatch(getComment(res));
};
export const postComments = async (dispatch: any, data: any) => {
  let res: any = await commentService.postComment(data);
  dispatch(postComment(res));
};
