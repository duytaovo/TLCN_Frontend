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
import { userSchema, UserSchema } from "src/utils/rules";
import { getAvatarUrl, isAxiosUnprocessableEntityError } from "src/utils/utils";
import DateSelect from "../../components/DateSelect";
import { setProfileToLS } from "src/utils/auth";
import { useAppDispatch } from "src/hooks/useRedux";
import { getMe, updateMe } from "src/store/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { User } from "src/types/user.type";
import { Button } from "@mui/material";

function Info() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();
  return (
    <Fragment>
      <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
          Tên:
        </div>
        <div className="sm:w-[80%] sm:pl-5">
          <Input
            classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
            register={register}
            name="name"
            placeholder="Tên"
            errorMessage={errors.name?.message}
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
            name="phone"
            render={({ field }) => (
              <InputNumber
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                placeholder="Số điện thoại"
                errorMessage={errors.phone?.message}
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
  UserSchema,
  "name" | "address" | "phone" | "date_of_birth" | "avatar"
>;

type FormDataError = Omit<FormData, "date_of_birth"> & {
  date_of_birth?: string;
};

const profileSchema = userSchema.pick([
  "name",
  "address",
  "phone",
  "date_of_birth",
  "avatar",
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
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
    resolver: yupResolver<any>(profileSchema),
  });
  const [profile, setProfileLocal] = useState<User>();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = methods;
  const avatar = watch("avatar");

  useEffect(() => {
    const _getMe = async () => {
      const res = await dispatch(getMe("")).then(unwrapResult);
      setProfileLocal(res);
    };
    _getMe();
  }, []);

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("address", profile.address);
      setValue("avatar", profile.avatar);
      setValue(
        "date_of_birth",
        profile.date_of_birth
          ? new Date(profile.date_of_birth)
          : new Date(1990, 0, 1)
      );
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      // date_of_birth: new Date(data.date_of_birth).toISOString()
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
      const res = await dispatch(updateMe(body)).then(unwrapResult);
      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      if (
        isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)
      ) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
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
                />
              </div>
            </div>
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
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
