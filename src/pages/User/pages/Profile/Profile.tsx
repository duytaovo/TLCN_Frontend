import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import InputNumber from "src/components/InputNumber";
import { AppContext } from "src/contexts/app.context";
import { ErrorResponse } from "src/types/utils.type";
import { schemaAddUser, SchemaRegister } from "src/utils/rules";
import { getAvatarUrl, isAxiosUnprocessableEntityError } from "src/utils/utils";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "@mui/material";
import { getUser, updateProfile } from "src/store/user/userSlice";
import SelectCustom from "src/components/Select";

function Info() {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.user);
  useEffect(() => {
    // dispatch(getUser(1));
  }, []);
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();
  return (
    <Fragment>
      <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
          Họ Tên:
        </div>
        <div className="sm:w-[80%] sm:pl-5">
          <Input
            classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
            register={register}
            name="fullName"
            placeholder="Họ Tên"
            defaultValue={profile?.fullName}
            errorMessage={errors.fullName?.message}
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
          Số điện thoại:
        </div>
        <div className="sm:w-[80%] sm:pl-5">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <InputNumber
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                placeholder="Số điện thoại"
                defaultValue={profile?.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  );
}

type FormData = Pick<
  SchemaRegister,
  "address" | "phoneNumber" | "email" | "imageUrl" | "fullName" | "gender"
>;

const profileSchema = schemaAddUser.pick([
  "address",
  "phoneNumber",
  "email",
  "fullName",
  "gender",
  "imageUrl",
]);

export default function Profile() {
  const { setProfile } = useContext(AppContext);
  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const dispatch = useAppDispatch();

  const methods = useForm<FormData>({
    defaultValues: {
      phoneNumber: "",
      address: "",
      imageUrl: "",
      fullName: "",
      email: "",
    },
    resolver: yupResolver<any>(profileSchema),
  });
  const { profile } = useAppSelector((state) => state.user);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = methods;
  const avatar = watch("imageUrl");

  useEffect(() => {
    dispatch(getUser(1));
  }, []);

  useEffect(() => {
    if (profile) {
      setValue("fullName", profile.fullName);
      setValue("phoneNumber", profile.phoneNumber);
      setValue("address", profile.address);
      setValue("imageUrl", profile.imageUrl);
      setValue("email", profile.email);
      setValue("gender", profile.gender?.toString());
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const body = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      password: "",
      email: data.email,
      gender: Number(data.gender),
      address: data.address,
      imageUrl: data.imageUrl,
      isEnable: true,
    };
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append("image", file);
        // const uploadRes = await uploadAvatarMutaion.mutateAsync(form);
        // avatarName = uploadRes.data.data;
        // setValue("avatar", avatarName);
      }
      const res = await dispatch(updateProfile(body)).then(unwrapResult);
      setProfile(res.data.data);
      // setProfileToLS(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
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
    }
  });

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };

  return (
    <div className="rounded-sm bg-white px-2 pl-5 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-2xl font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi
        </h1>
        <div className="mt-1 text-xl text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
          onSubmit={onSubmit}
        >
          <div className="mt-6 flex-grow md:mt-0 md:pr-12">
            <div className="flex flex-grow space-x-1 flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                Email:
              </div>
              <div className="sm:w-[80%] sm:pl-5 ml-2">
                <div className="pt-3 text-gray-900 ml-1">
                  {profile?.email || "voduytao3@gmail.com"}
                </div>
              </div>
            </div>
            <Info />
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                Địa chỉ:
              </div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                  register={register}
                  name="address"
                  placeholder="Địa chỉ"
                  errorMessage={errors.address?.message}
                  defaultValue={profile?.address}
                />
              </div>
            </div>
            <SelectCustom
              className={"flex-1 text-black"}
              id="gender"
              // label="Hãng xe"
              placeholder="Vui lòng chọn"
              defaultValue={Number(profile?.gender) === 0 ? "Nam" : "Nữ"}
              options={[
                { id: 0, name: "Nam" },
                { id: 1, name: "Nữ" },
              ]}
              register={register}
            >
              {errors.gender?.message}
            </SelectCustom>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
              <div className="sm:w-[80%] sm:pl-5">
                <Button
                  style={{
                    backgroundColor: "Highlight",
                  }}
                  className="flex h-12 w-12 items-center border-yellow-200 border-solid  rounded-sm  px-8 text-center text-sm text-black "
                  type="submit"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
            <div className="flex flex-col items-center">
              <div className="my-5 h-24 w-24">
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className="mt-3 text-gray-400">
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
