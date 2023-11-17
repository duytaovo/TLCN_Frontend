import { useState, Fragment } from "react";
import "./table.scss";
import OrderDetail from "./OrderDetail";
import { Table } from "flowbite-react";
import numberWithCommas from "src/utils/numberWithCommas";
import { useAppSelector } from "src/hooks/useRedux";
import { Button } from "antd";
import path from "src/constants/path";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const { historyOrder } = useAppSelector((state) => state.historyOrders);
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
  const [orderDetail, setOrderDetail] = useState({ index: -1, id: null });
  const handleDetail = (index: number, order: any) => {
    setOrderDetail((current) => {
      return current.index === index
        ? {
            index: -1,
            id: order.id,
          }
        : {
            index,
            id: order.id,
          };
    });
  };

  return (
    <Table hoverable={true} className="text-black/50 bg-transparent">
      <caption className="text-left p-4 font-semibold text-2xl">
        Đơn hàng đã mua gần đây
      </caption>
      <Table.Head className="bg-mainL1">
        <Table.HeadCell> Mã đơn hàng </Table.HeadCell>
        <Table.HeadCell>Sản phẩm</Table.HeadCell>
        <Table.HeadCell>Số lượng</Table.HeadCell>
        <Table.HeadCell>Tổng tiền</Table.HeadCell>
        <Table.HeadCell> Ngày đặt mua</Table.HeadCell>
        <Table.HeadCell>Trạng thái</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y overflow-hidden">
        {historyOrder?.data?.data?.map((order: any, index: number) => {
          const styleStatus = style(order.status);
          const displayDetail = index === orderDetail.index;

          return (
            <Fragment key={index}>
              <Table.Row className=" text-2xl dark:border-gray-700 dark:bg-gray-800 flex-[1000]">
                <Table.Cell className="text-blue-400">#{order.id}</Table.Cell>
                <Table.Cell className="text-blue-400  cursor-pointer hover:text-blue-700 select-none">
                  <Button
                    type="link"
                    onClick={() => handleDetail(index, order)}
                  >
                    Xem chi tiết
                  </Button>
                </Table.Cell>
                <Table.Cell>{order?.orderDetails?.length}</Table.Cell>
                <Table.Cell className="text-red-400">
                  {numberWithCommas(order?.finalPrice)}₫
                </Table.Cell>
                <Table.Cell>
                  <p className="">{order?.buyDate.substring(0, 10)}</p>
                </Table.Cell>
                <Table.Cell className={styleStatus}>
                  <span className="mr-4">{"Đã đặt hàng"}</span>
                  {order.paymentStatusString === "Payment success" ? (
                    <span className="text-white text-xl bg-green-500 p-2 rounded-lg">
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="text-white text-xl bg-gray-500 p-2 rounded-lg">
                      Chưa thanh toán
                    </span>
                  )}
                </Table.Cell>
              </Table.Row>
              {displayDetail && (
                <Table.Row>
                  <Table.Cell className="" colSpan={7}>
                    <OrderDetail
                      order={order}
                      displayDetail={displayDetail}
                      setOrderDetail={setOrderDetail}
                      index={index}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default OrderTable;
