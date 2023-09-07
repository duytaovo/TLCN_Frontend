import { useEffect } from "react";
import PurchaseHistory from "./PurchaseHistory";
import DangNhap from "./DangNhap";
import { useDispatch } from "react-redux";
import Info from "./Info";
const History = () => {
  try {
    const customer = JSON.parse(localStorage.getItem("customerInfo") || "");
    let phoneNumber = customer?.phone;
  } catch (error) {
    // Xử lý lỗi khi phân tích JSON không thành công
  }
  const dispatch = useDispatch();
  useEffect(() => {
    // getHistoryOrders(dispatch, phoneNumber);
  }, []);

  return (
    <div>
      {" "}
      <Info />
      <DangNhap />
    </div>
  );
};
export default History;
