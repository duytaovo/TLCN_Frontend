import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import path from "src/constants/path";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { ErrorResponse } from "src/types/utils.type";
import { schemaPayment } from "src/utils/rules";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import SelectCustom from "src/components/Select";

import InputFile from "src/components/InputFile";

interface FormData {}

const Payment: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schemaPayment),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    setValue("addressReceiver", "");
    setValue("message", "");
    setValue("nameReceiver", "");
    setValue("paymentMethod", "");
    setValue("phoneReceiver", "");
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const body = JSON.stringify({
      nameReceiver: "string",
      phoneReceiver: "string",
      addressReceiver: "string",
      message: "string",
      orderPrice: 0,
      deliveryPrice: 0,
      discount: 0,
      finalPrice: 0,
      userId: 0,
      paymentMethod: 0,
      orderProducts: [
        {
          productId: 0,
          typeId: 0,
          depotId: 0,
          quantity: 0,
        },
      ],
    });

    try {
      setIsSubmitting(true);
      const res = await dispatch(addSmartPhone(body));
      unwrapResult(res);
      // const d = res?.payload?.data;
      // if (d?.code !== 201) return toast.error(d?.message);
      await toast.success("Thêm sản phẩm điện thoại thành công ");
      await dispatch(getSmartPhones(""));
      await navigate(path.smartPhone);
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
    <div className="bg-white shadow ">
      <h2 className="font-bold m-4 text-2xl">Thanh toán sản phẩm</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800, padding: 6 }}
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
        <Form.Item label="Ghi chú" name="message" rules={[{ required: true }]}>
          <Input
            placeholder="Giao nhanh ..."
            name="message"
            register={register}
            type="text"
            className=""
            errorMessage={errors.message?.message}
          />
        </Form.Item>

        <div className="flex justify-start">
          <Form.Item label="" className="ml-[135px] mb-2 bg-green-300">
            <Button className="w-[100px]" onClick={onSubmit} type="default">
              Lưu
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
