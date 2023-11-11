import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import path from "src/constants/path";
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
        return result + current.price * current.quantity;
      }, 0),
    [valueBuy]
  );
  const onSubmit = handleSubmit(async (data) => {
    const deliveryPrice = 30000;
    const discount = 20000;
    // const finalPrice = totalPurchasePrice - deliveryPrice - discount;
    const body = JSON.stringify({
      nameReceiver: data.nameReceiver,
      phoneReceiver: data.phoneReceiver,
      addressReceiver: data.addressReceiver,
      message: data.message,
      orderPrice: totalPurchasePrice,
      deliveryPrice,
      discount,
      finalPrice: 10000,
      userId: profile.id,
      paymentMethod: Number(data.paymentMethod),
      orderProducts: valueBuy?.map((item) => ({
        productId: item.product_id,
        typeId: item.typeId,
        depotId: item.depotId,
        quantity: item.quantity,
      })),
    });

    try {
      setIsSubmitting(true);
      const res = await dispatch(buyPurchases(body));
      unwrapResult(res);
      const d = res?.payload?.data;
      if (d?.code !== 200) return toast.error(d?.message);
      localStorage.removeItem("cartItemsBuy");
      // await toast.success("Thanh toán thành công ");
      window.location.href = d.data.paymentUrl;
      // await navigate(d.data.paymentUrl);
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
    <div className=" bg-white ">
      <h2 className="font-bold m-4 text-2xl">Thanh toán sản phẩm</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        layout="horizontal"
        style={{ maxWidth: 1100, padding: 2 }}
        autoComplete="off"
        noValidate
        onSubmitCapture={onSubmit}
      >
        <Form.Item
          label="Phương thức thanh toán"
          name="paymentMethod"
          rules={[{ required: true }]}
        >
          <SelectCustom
            className={"flex-1 text-black"}
            id="paymentMethod"
            placeholder="Vui lòng chọn"
            defaultValue={""}
            options={[
              { id: 1, name: "Thanh toán khi nhận hàng" },
              { id: 2, name: "Thanh toán qua VNPay" },
            ]}
            register={register}
            isBrand={true}
          >
            {errors.paymentMethod?.message}
          </SelectCustom>
        </Form.Item>

        <Form.Item
          label="Tên người nhận"
          name="nameReceiver"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Nguyen Van A"
            name="nameReceiver"
            register={register}
            type="text"
            className=""
            errorMessage={errors.nameReceiver?.message}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ nhận hàng"
          name="addressReceiver"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="76/3 đường số 7 phường Linh Trung, TPHCM"
            name="addressReceiver"
            register={register}
            type="text"
            className=""
            errorMessage={errors.addressReceiver?.message}
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại nhận hàng"
          name="phoneReceiver"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="0367119876"
            name="phoneReceiver"
            register={register}
            type="text"
            className=""
            errorMessage={errors.phoneReceiver?.message}
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="message">
          <Input
            placeholder="Giao nhanh ..."
            name="message"
            register={register}
            type="text"
            className=""
            errorMessage={errors.message?.message}
          />
        </Form.Item>
        <Form.Item label="Phí vận chuyển" name="deliveryPrice">
          <Input
            placeholder="30.000đ"
            name="deliveryPrice"
            register={register}
            type="text"
            className=""
            defaultValue={30000}
            // errorMessage={errors.deliveryPrice?.message}
            disabled
          />
        </Form.Item>
        <Form.Item label="Giảm giá" name="discount">
          <Input
            placeholder="20.000đ"
            name="discount"
            register={register}
            type="text"
            className=""
            defaultValue={20000}
            // errorMessage={errors.message?.message}
            disabled
          />
        </Form.Item>
        <div className="flex items-center sm:justify-end">
          <div>Tổng thanh toán ({valueBuy.length} sản phẩm):</div>
          <div className="ml-2 text-2xl text-orange-600">
            ₫{formatCurrency(totalPurchasePrice - 30000 - 20000)}
          </div>
        </div>
        <div className="flex justify-start">
          <Form.Item label="" className="ml-[135px] mb-2 bg-green-300">
            <Button className="w-[100px]" onClick={onSubmit} type="default">
              Thanh toán
            </Button>
          </Form.Item>
          <Form.Item label="" className="ml-[70px] mb-2">
            <Button
              className="w-[100px] bg-blue-300"
              onClick={onClickHuy}
              type="dashed"
              color="red"
            >
              Đặt lại
            </Button>
          </Form.Item>
          <Form.Item label="" className="ml-[70px] mb-2 bg-red-300">
            <Button
              className="w-[100px]"
              onClick={() => {
                navigate(path.home);
              }}
            >
              Hủy
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default () => <Payment />;
