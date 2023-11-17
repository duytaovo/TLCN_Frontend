import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/hooks/useRedux";
import OrderTable from "./OrderTable";

const EmptyOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <img
        src="https://www.thegioididong.com/lich-su-mua-hang/images/gio-hang-rong-desk.png"
        title="Tiếp tục mua sắm"
      ></img>

      <p>Bạn chưa có đơn hàng nào</p>
      <Link className="text-blue-400" to="/">
        Về trang chủ
      </Link>
      <div>
        Khi cần hỗ trợ vui lòng gọi <a href="tel:18001060">1800.1234</a> (7h30 -
        22h)
      </div>
    </div>
  );
};
const PurchaseHistory = () => {
  const { historyOrder } = useAppSelector((state) => state.historyOrders);
  const check = historyOrder?.data?.data?.length === 0;
  return <div>{check ? <EmptyOrder /> : <OrderTable />}</div>;
};
export default PurchaseHistory;
