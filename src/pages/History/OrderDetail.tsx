import { CheckCircleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import numberWithCommas from "src/utils/numberWithCommas";

function OrderDetail(props: any) {
  const { customer } = props;
  const orderItems = props.order_items.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deliveryTime = props?.deliveryTime || "3/9/2023";
  const amountPaid = props.totalPrice;
  const surcharge = props?.surcharge || 20000;
  const style = (text: string) => {
    switch (text) {
      case "Đã đặt hàng":
      case "Đặt hàng":
        return "text-green-400";
      case "Đang giao hàng":
        return "text-blue-400";
      case "Đã hủy":
        return "text-red-400";
      case "Đã nhận":
        return "text-gray-400";
    }
  };
  const handlePayment = () => {
    // dispatch(postOrder(props));
    navigate("/order");
  };
  const checkPayment = props.status != "Đã hủy" && props.payment.paid == false;
  return (
    <div>
      <div className="p-8 border-b">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">Chi tiết đơn hàng: #{props.id}</h2>
          <p className="text-2xl">
            Trạng thái:{" "}
            <span className={style(props.status)}>{props.status}</span>
            {checkPayment && (
              <p
                className="cursor-pointer text-blue-400"
                onClick={handlePayment}
              >
                Tiến hành thanh toán
              </p>
            )}
          </p>
        </div>
        <p className="text-3xl">Mua tại docongnghe.com</p>
      </div>
      {orderItems.map((item: any, index: number) => {
        return (
          <div className="flex justify-between py-4 border-b" key={index}>
            <div className="flex">
              <div className="w-56 h-56">
                <img className="object-cover" src={item.img} alt={item.title} />
              </div>
              <div>
                <p className="font-semibold text-3xl">{item.title}</p>
                <p>Màu: {item.color}</p>
                <p>Số lượng: {item.quantity}</p>
              </div>
            </div>

            <div>
              <p className="text-red-400">
                {numberWithCommas(item.price * (1 - item.discount))}
              </p>
              <p className="line-through">{numberWithCommas(item.price)}₫</p>
            </div>
          </div>
        );
      })}
      <div className="border-b p-4 text-3xl leading-[40px]">
        <p>Giá tạm tính: {numberWithCommas(props.totalPrice)}₫</p>
        <p>
          <span className="">Phụ phí: </span>{" "}
          <span>+{numberWithCommas(surcharge)}₫</span>
        </p>
        <p>
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-500">
            {numberWithCommas(amountPaid + surcharge)}₫
          </span>
        </p>
        <p>
          <CheckCircleFill className="text-blue-500" />
          <span className="font-bold"> Số tiền đã thanh toán: </span>
          {props.payment.paid && (
            <span className="text-red-400">
              {numberWithCommas(amountPaid + surcharge)}₫
            </span>
          )}
          {checkPayment && (
            <>
              <span>Chưa thanh toán</span>{" "}
              <a className="text-blue-400">Tiến hành thanh toán</a>
            </>
          )}
        </p>
      </div>
      <div className="border-b p-4 text-3xl leading-[40px]">
        <p className="font-bold text-3xl">
          Địa chỉ và thông tin người nhận hàng
        </p>
        <ul>
          <li>
            {customer.sex} {customer.username} - {customer.phone}
          </li>
          <li>
            Địa chỉ nhận hàng {customer.address.ward}{" "}
            {customer.address.district} {customer.address.city}
          </li>
          <li>Thời gian nhận hàng: {deliveryTime}</li>
        </ul>
      </div>
      <div className=" flex justify-center py-4">
        <button className="bg-blue-400 rounded-xl p-4">
          Quay lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
