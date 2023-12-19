import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useRedux";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "src/types/utils.type";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { SchemaForGot, schemaForgot } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCodeValidator } from "src/store/user/userSlice";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { Helmet } from "react-helmet-async";
// import logo from "./logo-main.png";
import logo from "src/assets/images/logotechstore.jpg";

import Button from "../../Button";
import path from "src/constants/path";

const CodeValidator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm({
    resolver: yupResolver(schemaForgot),
  });

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      phoneNumber: data.phoneNumber,
      email: data.email,
      validatorType: 1,
    };
    try {
      await setIsSubmitting(true);
      const res = await dispatch(getCodeValidator(body));
      unwrapResult(res);
      const d = res?.payload.data;
      if (d?.code !== 200) return toast.error("Lỗi cấp lại mật khẩu");
      navigate(path.forgotPassword);
      toast.success(
        "Thành công, vui lòng kiểm tra email và điền mã xác nhận !!!",
      );
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<SchemaForGot>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof SchemaForGot, {
              message: formError[key as keyof SchemaForGot],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className=" items-start bg-white  m-auto mb-5 flex justify-center  h-screen">
      <Helmet>
        <title>Quên mật khẩu </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="lg:col-span-2 lg:col-start-4  bg-mainColor/30 w-1/4 md:w-full justify-center m-10 rounded">
        <div className=" ">
          <Link
            to={path.home}
            className=" mt-2 rounded-[30px] p-4 text-xs decoration-solid underline hover:text-red-300  text-blue-400 hover:opacity-80"
          >
            <span className="text-2xl mt-4">Trang chủ</span>
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-2xl mt-3">
          <img
            src={logo}
            alt="logo"
            className="w-52 h-32 rounded-md md:hidden"
          ></img>
        </div>
        <form
          className="rounded p-10 md:p-2 shadow-sm"
          onSubmit={onSubmit}
          noValidate
        >
          <div className=" flex items-center justify-center text-[25px] text-black">
            Quên mật khẩu
          </div>

          <Input
            name="phoneNumber"
            register={register}
            type="text"
            className="mt-8"
            errorMessage={errors.phoneNumber?.message}
            placeholder="Số điện thoại"
          />
          <Input
            name="email"
            register={register}
            type="text"
            className="mt-2"
            classNameEye="absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]"
            errorMessage={errors.email?.message}
            placeholder="Email"
            autoComplete="on"
          />

          <div className="mt-3 flex justify-center space-x-2 items-center ">
            <Button
              type="submit"
              className="flex w-full items-center justify-center mt-2 rounded bg-mainColor py-3 px-2 text-sm uppercase text-white hover:opacity-80"
            >
              {isSubmitting ? "Loading..." : "Lấy mã xác nhận"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeValidator;

