import { Purchase, PurchaseListStatus } from "src/types/purchase.type";
import { SuccessResponse } from "src/types/utils.type";
import http, { httpCart } from "src/utils/http";

const URL = "purchases";

export const orderService = {
  postOrder(data: any) {
    return http.post(`/orders/`, data);
  },
  addToCart(body: { product_id: string; buy_count: number }) {
    return httpCart.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body);
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return httpCart.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params,
    });
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return httpCart.post<SuccessResponse<Purchase[]>>(
      `${URL}/buy-products`,
      body
    );
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return httpCart.put<SuccessResponse<Purchase>>(
      `${URL}/update-purchase`,
      body
    );
  },
  deletePurchase(purchaseIds: string[]) {
    return httpCart.delete<SuccessResponse<{ deleted_count: number }>>(
      `${URL}`,
      {
        data: purchaseIds,
      }
    );
  },
};
