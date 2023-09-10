import { orderService } from "src/services";
import { postOrder } from "./orderSlice";

export const postOrders = async (dispatch: any, data: any) => {
  //   let res = await orderService.postOrder(data);
  dispatch(postOrder(data));
};
