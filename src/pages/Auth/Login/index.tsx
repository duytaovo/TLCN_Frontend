import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useRedux";
import { AppContext } from "src/contexts/app.context";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "src/types/utils.type";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { Schema, schema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "src/store/user/userSlice";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { getAccessTokenFromLS, setAccessTokenToLS } from "src/utils/auth";
import { Helmet } from "react-helmet-async";
import { Spin } from "antd";
import { CircularProgress } from "@mui/material";
import Button from "../Button";

type FormData = Pick<Schema, "email" | "password">;
const loginSchema = schema.pick(["email", "password"]);

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    try {
      setIsSubmitting(true);
      const res = await dispatch(login(body));
      unwrapResult(res);
      console.log(res);
      const d = res?.payload?.data;
      if (d?.result == 0) return toast.error(d?.message);
      await setAccessTokenToLS(d?.accessToken);
      await getAccessTokenFromLS();
      await setIsAuthenticated(true);
      await toast.success("Đăng nhập thành công ");

      setTimeout(async () => {
        await navigate("/");
        await window.location.reload();
      }, 1000);
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

  return (
    <div className="w-full flex justify-center">
      <Helmet>
        <title>Login </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="lg:col-span-2 lg:col-start-4 bg-white w-1/2 md:w-full justify-center m-10 rounded-2xl">
        <div className="flex items-center justify-center rounded-2xl mt-3">
          <img src="/logo.jpg" alt="logo" className="w-30 h-20 md:hidden"></img>
        </div>
        <form
          className="rounded p-10 md:p-2 shadow-sm"
          onSubmit={onSubmit}
          noValidate
        >
          <div className=" flex items-center justify-center text-[25px] text-black">
            Đăng nhập
          </div>

          <Input
            name="email"
            register={register}
            type="text"
            className="mt-8"
            errorMessage={errors.email?.message}
            placeholder="User name"
          />
          <Input
            name="password"
            register={register}
            type="password"
            className="mt-2"
            classNameEye="absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]"
            errorMessage={errors.password?.message}
            placeholder="Password"
            autoComplete="on"
          />
          <div className="mt-3">
            <Button
              type="submit"
              className="flex w-full items-center justify-center rounded-[30px] bg-mainColor py-4 px-2 text-sm uppercase text-white hover:opacity-80"
            >
              {isSubmitting ? (
                <CircularProgress
                  sx={{ width: "25px", height: "25px" }}
                  disableShrink
                />
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <span className="text-base text-center flex w-full items-center justify-center mt-2 ">
              Hoặc
            </span>

            <div onClick={() => navigate("/register")} className="mt-3">
              <Button className="flex w-full items-center justify-center rounded-[30px] bg-mainL1 py-4 px-2 text-sm uppercase text-white hover:opacity-80">
                Đăng ký
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
