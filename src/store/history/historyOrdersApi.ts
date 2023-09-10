import { historyService } from "src/services";
import { getHistoryOrder } from "./historyOrdersSlice";

export const getHistoryOrders = async (dispatch: any, phone: any) => {
  let res = await historyService.getHistoryOrderByPhone(phone);
  dispatch(getHistoryOrder(res));
};
export const updateHistoryOrders = async (dispatch: any, data: any) => {
  //   let res = await historyService.updateHistoryOrder(data);
  // dispatch(getHistoryOrder(res));
};
