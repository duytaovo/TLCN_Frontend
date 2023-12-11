import { useState, Fragment, useEffect } from "react";
import "./table.scss";
import OrderDetail from "./OrderDetail";
import { Table } from "flowbite-react";
import numberWithCommas from "src/utils/numberWithCommas";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Button } from "antd";
import path from "src/constants/path";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getHistoryOrders } from "src/store/history/historyOrdersSlice";
import Filter from "src/components/Filter/Filter";
const data = [
  {
    id: 1,
    title: "Trạng thái đơn hàng",
    detail: [
      {
        id: 1,
        name: "Đã đặt",
      },
      {
        id: 2,
        name: "Đã xác nhận",
      },
      {
        id: 3,
        name: "Đang giao hàng",
      },
      {
        id: 4,
        name: "Đã giao hàng",
      },
      {
        id: 5,
        name: "Đã huỷ",
      },
    ],
  },
  {
    id: 2,
    title: "Phương thức thanh toán",
    detail: [
      {
        id: 1,
        name: "Thanh toán trực tiếp",
      },
      {
        id: 2,
        name: "Thanh toán qua VNPay",
      },
    ],
  },
];
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
  const dispatch = useAppDispatch();
  const [dataFilterLocal, setDataFilterLocal] = useState<any>();
  const filter = useAppSelector((state) => state.smartphone.filter.data); // Lấy tất cả

  const [value, setValue] = useState<Dayjs | null>(dayjs("2023-01-01"));
  const [value2, setValue2] = useState<Dayjs | null>(dayjs());

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
  console.log(filter);
  useEffect(() => {
    const separateArrays = (data: any) => {
      const result: any = {};

      data.forEach((item: any) => {
        const key = Object.keys(item)[0]; // Lấy tên thuộc tính (ví dụ: 'Hãng', 'Giá', ...)

        if (!result[key]) {
          result[key] = [];
        }

        result[key].push(item[key]);
      });

      return result;
    };
    // Gọi hàm tách mảng
    const separatedArrays = separateArrays(filter);
    setDataFilterLocal(separatedArrays);
  }, [filter]);

  // Kết quả
  if (dataFilterLocal) {
    var {
      "Trạng thái đơn hàng": Trangthaidonhang,
      "Phương thức thanh toán": Phuongthucthanhtoan,
    } = dataFilterLocal;
  }

  useEffect(() => {
    const body = {
      orderStatus: Trangthaidonhang ? Trangthaidonhang : [],
      buyDateFrom: value?.format("YYYY-MM-DD") || null,
      buyDateTo: value2?.format("YYYY-MM-DD") || null,
      paymentStatus: Phuongthucthanhtoan ? Phuongthucthanhtoan : [],
    };
    dispatch(
      getHistoryOrders({
        body: body,
        params: { pageNumber: 0, pageSize: 10 },
      }),
    );
  }, [value, Trangthaidonhang, Phuongthucthanhtoan]);

  const stringStatus = (text: string) => {
    switch (text) {
      case "Ordered":
        return "Đã đặt hàng";
      case "Delivering":
        return "ĐANG GIAO HÀNG";
      case "Cancelled":
        return "Đã hủy";
      case "Confirmed":
        return "Đã xác nhận";
      case "Delivered":
        return "Đã giao hàng";
    }
  };
  return (
    <div>
      <div className="text-mainColor max-w-[1200px] ml-5 mb-5 m-auto">
        <Filter handle={() => {}} data={data} />
      </div>
      <div className="space-x-5 ml-5">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Chọn ngày mua bắt đầu"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Chọn ngày mua cuối cùng"
            value={value2}
            onChange={(newValue) => setValue2(newValue)}
          />
        </LocalizationProvider>
      </div>
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
            const styleStatus = style(order.orderStatusString);
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
                    <div className="flex flex-grow justify-between text-xl font-bold">
                      {stringStatus(order.orderStatusString)}
                      {order.paymentStatusString === "Payment success" ? (
                        <span className="text-white text-xl bg-green-500 p-2 rounded-lg">
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="text-white text-xl bg-gray-500 p-2 rounded-lg">
                          Chưa thanh toán
                        </span>
                      )}
                    </div>
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
    </div>
  );
};

export default OrderTable;

