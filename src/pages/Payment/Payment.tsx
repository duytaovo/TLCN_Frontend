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
import { getUser, getUserById } from "src/store/user/userSlice";
import { ChevronLeft } from "@mui/icons-material";
import moment from "moment";
import { buyPurchases } from "src/store/order/ordersSlice";
import path from "src/constants/path";
import { LocationForm } from "src/components/LocationForm";
import axios from "axios";
import config from "src/constants/configApi";

interface FormData {}

const Payment: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idMethod, setIdMethod] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);

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
  const { valueBuy } = useAppSelector((state) => state.cartItems);
  const { profile, userWithId } = useAppSelector((state) => state.user);
  const [addressOption, setAddresOption] = useState<any>();
  const [methodTransport, setMethodTransport] = useState<any>();
  const addressSelect =
    addressOption?.ward.name +
    " " +
    addressOption?.district.name +
    " " +
    addressOption?.city.name;
  useEffect(() => {
    axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
        {
          params: {
            shop_id: config.shopId,
            from_district: 1442,
            to_district: addressOption?.district.id,
          },
          headers: {
            "Content-Type": "application/json",
            token: "9c800251-8994-11ee-b394-8ac29577e80e",
          },
        },
      )
      .then(function (response) {
        const method = response.data.data.map(
          ({
            service_id,
            short_name,
          }: {
            service_id: number;
            short_name: string;
          }) => ({
            id: service_id,
            name: short_name,
          }),
        );
        setMethodTransport(method);
      })
      .catch(function (error) {
        // toast.error(error.message);
      })
      .finally(function () {
        // always executed
      });
  }, [addressOption]);

  useEffect(() => {
    axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          params: {
            from_district_id: 1442,
            to_district_id: addressOption?.district.id,
            service_id: idMethod,
            insurance_value: "",
            coupon: "",
            to_ward_code: addressOption?.ward.id,
            weight: 1000,
            length: 20,
            width: 20,
            height: 20,
          },
          headers: {
            "Content-Type": "application/json",
            token: "9c800251-8994-11ee-b394-8ac29577e80e",
            shop_id: config.shopId,
          },
        },
      )
      .then(function (response) {
        setFee(Math.ceil(response.data.data.total));
      })
      .catch(function (error) {
        // toast.error(error.message);
      })
      .finally(function () {
        // always executed
      });
  }, [idMethod, addressOption]);

  useEffect(() => {
    setValue("addressReceiver", userWithId.address);
    setValue("message", "");
    setValue("nameReceiver", userWithId.fullName);
    setValue("paymentMethod", "");
    setValue("phoneReceiver", userWithId.phoneNumber);
  }, [userWithId]);

  useEffect(() => {
    const _getData = async () => {
      const res = await dispatch(getUser(""));
      await unwrapResult(res);
      await dispatch(getUserById(res?.payload?.data.data.id));
    };
    _getData();
  }, []);
  const totalPurchasePrice = useMemo(
    () =>
      valueBuy.reduce((result, current) => {
        return result + current.salePrice * current.quantity;
      }, 0),
    [valueBuy],
  );
  const onSubmit = handleSubmit(async (data) => {
    const deliveryPrice = fee;
    const discount = 0;

    const finalPrice = totalPurchasePrice + deliveryPrice - discount;
    const body = JSON.stringify({
      nameReceiver: data.nameReceiver,
      phoneReceiver: data.phoneReceiver,
      addressReceiver: data.addressReceiver + " " + addressSelect,
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
      // localStorage.removeItem("cartItems");
      if (Number(data.paymentMethod) === 1) {
        toast.success("Đặt hàng thành công.");
        navigate(path.home);
        return;
      }
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
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  });

  const onChange = (value: number) => setIdMethod(value);

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
          <div className="flex justify-between py-4  font-bold">
            <span>Tạm tính ({valueBuy.length}) sản phẩm:</span>
            <span className="text-red-500 text-2xl">
              {" "}
              {formatCurrency(totalPurchasePrice)}₫
            </span>
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
                classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                name="nameReceiver"
                register={register}
                type="text"
                className="w-1/2 "
                errorMessage={errors.nameReceiver?.message}
              />

              <Input
                placeholder="0367119876"
                name="phoneReceiver"
                classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                register={register}
                type="text"
                className="w-1/2"
                errorMessage={errors.phoneReceiver?.message}
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="border border-gray-300 p-4 rounded-xl space-y-3">
                <p>
                  Nhập địa chỉ để biết thời gian nhận hàng và phí vận chuyển
                  (nếu có)
                </p>

                <Input
                  placeholder="Số nhà, tên đường"
                  name="addressReceiver"
                  classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                  register={register}
                  type="text"
                  className=""
                  errorMessage={errors.addressReceiver?.message}
                />
                <LocationForm
                  onChange={(e: any) => {
                    setAddresOption(e);
                  }}
                />
                <div>
                  {/* <div className="flex justify-between mb-4">
                    <span>
                      Giao trước 20h hôm nay ({moment().format("DD/MM/YYYY")})
                    </span>
                  </div> */}
                </div>
                <h4>CHỌN CÁCH THỨC NHẬN HÀNG</h4>
                <div className="mt-8">
                  <SelectCustom
                    className={"flex-1 text-black"}
                    id="methodTransport"
                    placeholder="Cách thức nhận hàng"
                    options={methodTransport}
                    register={register}
                    isBrand={true}
                    onChange={onChange}
                  >
                    {/* {errors.paymentMethod?.message} */}
                  </SelectCustom>
                </div>
                <p className="text-green-600 mt-6">
                  Phí giao hàng: {formatCurrency(fee)}₫
                </p>
                <h4>CHỌN PHƯƠNG THỨC THANH TOÁN</h4>
                <div className="mt-8">
                  <SelectCustom
                    className={"flex-1 text-black"}
                    id="paymentMethod"
                    placeholder="Cách thức thanh toán"
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
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <Input
                placeholder="Ghi chú (không bắt buộc)"
                classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
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
              <strong className="text-red-600 text-2xl">
                {formatCurrency(totalPurchasePrice + fee - 0)}₫
              </strong>
            </div>
            <button
              type="submit"
              className="h-20 my-8 bg-yellow-300 rounded-lg w-full text-black/50 text-2xl hover:bg-mainColor hover:text-white transition-all duration-500 font-bold"
            >
              {isSubmitting ? (
                <span className="text-2xl mt-4">Loading...</span>
              ) : (
                <span className="text-2xl mt-4">Đặt hàng</span>
              )}
            </button>
            <small className="block text-center">
              Bạn có thể chọn hình thức thanh toán sau khi đặt hàng
            </small>
          </div>
        </form>
        <small className="text-center text-gray-600 w-full h-24 flex justify-center items-center">
          Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của
          docongnghe.com
        </small>
      </div>
    </div>
  );
};

export default () => <Payment />;

