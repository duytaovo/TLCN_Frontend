import { useEffect } from "react";
import PurchaseHistory from "./PurchaseHistory";
import DangNhap from "./DangNhap";
import { useDispatch } from "react-redux";
import Info from "./Info";
import { Helmet } from "react-helmet-async";
const History = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const customer = JSON.parse(localStorage.getItem("customerInfo") || "");
      let phoneNumber = customer?.phone;
    } catch (error) {}
    // getHistoryOrders(dispatch, phoneNumber);
  }, []);

  return (
    <div>
      {" "}
      <Helmet>
        <title>Trang lịch sử mua hàng </title>
        <meta name="description" content="Trang lịch sử mua hàng" />
      </Helmet>
      <Info />
      <DangNhap />
    </div>
  );
};
export default History;
