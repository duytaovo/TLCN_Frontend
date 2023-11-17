import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { ErrorResponse } from "src/types/utils.type";
import { schemaPayment } from "src/utils/rules";
import {
  formatCurrency,
  isAxiosUnprocessableEntityError,
} from "src/utils/utils";
import SelectCustom from "src/components/Select";
import { buyPurchases } from "src/store/order/orderSlice";
import { getUser } from "src/store/user/userSlice";
import { ChevronLeft } from "@mui/icons-material";
import moment from "moment";

interface FormData {}

const Payment: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaPayment),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile } = useAppSelector((state) => state.user);
  const { valueBuy } = useAppSelector((state) => state.cartItems);
  useEffect(() => {
    setValue("addressReceiver", "");
    setValue("message", "");
    setValue("nameReceiver", "");
    setValue("paymentMethod", "");
    setValue("phoneReceiver", "");
  }, []);
  useEffect(() => {
    dispatch(getUser(""));
  }, []);
  const totalPurchasePrice = useMemo(
    () =>
      valueBuy.reduce((result, current) => {
        return result + current.salePrice * current.quantity;
      }, 0),
    [valueBuy]
  );
  const onSubmit = handleSubmit(async (data) => {
    const deliveryPrice = 30000;
    const discount = 0;

    const finalPrice = totalPurchasePrice + deliveryPrice - discount;
    const body = JSON.stringify({
      nameReceiver: data.nameReceiver,
      phoneReceiver: data.phoneReceiver,
      addressReceiver: data.addressReceiver,
      message: data.message,
      orderPrice: Number(totalPurchasePrice),
      deliveryPrice,
      discount,
      finalPrice: finalPrice,
      userId: Number(profile.id),
      paymentMethod: Number(data.paymentMethod),
      orderProducts: valueBuy?.map((item) => ({
        productId: Number(item.product_id),
        typeId: Number(item.typeId),
        depotId: Number(item.depotId),
        quantity: Number(item.quantity),
      })),
    });
    try {
      setIsSubmitting(true);
      const res = await dispatch(buyPurchases(body));
      unwrapResult(res);
      const d = res?.payload?.data;
      if (d?.code !== 200) return toast.error(d?.message);
      localStorage.removeItem("cartItemsBuy");
      window.location.href = d.data.paymentUrl;
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  });
  const onClickHuy = () => {
    setValue("addressReceiver", "");
    setValue("message", "");
    setValue("nameReceiver", "");
    setValue("paymentMethod", "");
    setValue("phoneReceiver", "");
  };

  return (
    <div className=" bg-mainBackGroundColor/30 ">
      <div className="w-1/2 m-auto">
        <div className="flex justify-between py-4">
          <Link to="/" className="text-blue-500">
            <i>
              <ChevronLeft />
            </i>
            Mua thêm sản phẩm khác
          </Link>
          <p>Giỏ hàng của bạn</p>
        </div>

        <form
          className="bg-white rounded-xl px-14 py-8 shadow-sm"
          onSubmit={onSubmit}
        >
          {/* {cartItems.map((product, index) => (
            <ProductItem key={index} {...product} />
          ))} */}
          <div className="flex justify-between py-4">
            <span>Tạm tính ({valueBuy.length})sản phẩm):</span>
            <span> {formatCurrency(totalPurchasePrice - 30000 - 20000)}₫</span>
          </div>
          <div className=" border-t py-4">
            <h4>THÔNG TIN KHÁCH HÀNG</h4>
            <div className="my-4">
              <input
                id="male"
                type="radio"
                name="sex"
                value="Anh"
                defaultChecked
              />
              &nbsp;
              <label htmlFor="male">Anh</label>
              &emsp;
              <input id="female" type="radio" name="sex" value="Chị" />
              &nbsp;
              <label htmlFor="female">Chị</label>
            </div>

            <div className="flex gap-4 ">
              <Input
                placeholder="Nguyen Van A"
                name="nameReceiver"
                register={register}
                type="text"
                className="w-1/2 "
                errorMessage={errors.nameReceiver?.message}
              />

              <Input
                placeholder="0367119876"
                name="phoneReceiver"
                register={register}
                type="text"
                className="w-1/2"
                errorMessage={errors.phoneReceiver?.message}
              />
            </div>
          </div>
          <div className="">
            <h4>CHỌN CÁCH THỨC NHẬN HÀNG</h4>
            <div className="my-4">
              <input id="site" type="radio" name="destination" />
              &nbsp;
              <label htmlFor="site">Giao tận nơi</label>
              &emsp;
            </div>
            <h4>CHỌN PHƯƠNG THỨC THANH TOÁN</h4>
            <div className="mt-8">
              <SelectCustom
                className={"flex-1 text-black"}
                id="paymentMethod"
                placeholder="Vui lòng chọn"
                options={[
                  { id: 1, name: "Thanh toán khi nhận hàng" },
                  { id: 2, name: "Thanh toán qua VNPay" },
                ]}
                register={register}
                isBrand={true}
              >
                {errors.paymentMethod?.message}
              </SelectCustom>
            </div>
            <div className="mt-5">
              <div className="border border-gray-300 p-4 rounded-xl">
                <p>
                  Chọn địa chỉ để biết thời gian nhận hàng và phí vận chuyển
                  (nếu có)
                </p>

                <Input
                  placeholder="76/3 đường số 7 phường Linh Trung, TPHCM"
                  name="addressReceiver"
                  register={register}
                  type="text"
                  className=""
                  errorMessage={errors.addressReceiver?.message}
                />

                <div>
                  <div className="flex justify-between mb-4">
                    <span>
                      Giao trước 20h hôm nay ({moment().format("DD/MM/YYYY")})
                    </span>
                  </div>
                  <p className="text-green-600 mt-6">Miễn phí giao hàng</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <Input
                placeholder="Ghi chú (không bắt buộc)"
                name="message"
                register={register}
                type="text"
                className=""
                errorMessage={errors.message?.message}
              />
            </div>
            <div className="my-4">
              <div className="my-4">
                <div className="my-4">
                  <input type="checkbox" />
                  &nbsp;
                  <label htmlFor="">
                    Hướng dẫn sử dụng, giải đáp thắc mắc sản phẩm
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* <div className=" border-b ">
              <button className="p-4 border rounded-lg my-4">
                <i>
                  <TicketPerforated />
                </i>
                &nbsp;
                <span>Sử dụng mã giảm giá</span>&nbsp;
                <i>
                  <ChevronDown />
                </i>
              </button>
              <div className="flex gap-8 border border-gray-300  p-4 rounded-xl">
                <Input
                  placeholder="Nhập mã giảm giá ..."
                  name="nameReceiver"
                  register={register}
                  type="text"
                  className=""
                />

                <button className="py-4 px-10 border bg-blue-600 rounded-lg text-white">
                  Áp dụng
                </button>
              </div>
            </div> */}

            <div className="flex justify-between my-4">
              <strong>Tổng tiền:</strong>
              <strong className="text-red-600 text-3xl">
                ₫{formatCurrency(totalPurchasePrice - 30000 - 0)}
              </strong>
            </div>
            <button
              type="submit"
              className="h-20 my-8 bg-yellow-300 rounded-lg w-full text-white font-bold"
            >
              ĐẶT HÀNG
            </button>
            <small className="block text-center">
              Bạn có thể chọn hình thức thanh toán sau khi đặt hàng
            </small>
          </div>
        </form>
        <small className="text-center text-gray-600 w-full h-24 flex justify-center items-center">
          Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của
          thegioicongnghe.com
        </small>
      </div>
    </div>
  );
};

export default () => <Payment />;
