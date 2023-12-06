import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import { AppContext } from "src/contexts/app.context";
import { ErrorResponse } from "src/types/utils.type";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUser, getUserById, updateProfile } from "src/store/user/userSlice";
import SelectCustom from "src/components/Select";
import { useNavigate } from "react-router-dom";
import path from "src/constants/path";
import { Helmet } from "react-helmet-async";
import { setProfileToLS } from "src/utils/auth";
import Button from "./Button";
import { uploadManyImages } from "src/store/comment/commentsSlice";
import { LocationForm } from "src/components/LocationForm";

interface FormData {
  gender: string | undefined;
  phoneNumber: string;
  email: string;
  password: string;
  fullName: string | undefined;
  address: string;
  imageUrl: string | undefined;
}

export default function Profile() {
  const { setProfile } = useContext(AppContext);
  const [file, setFile] = useState<File[]>();
  const imageArray = file || []; // Mảng chứa các đối tượng ảnh (File hoặc Blob)
  const [imageUrls, setImages] = useState<string[]>([]);
  // Tạo một mảng chứa các URL tạm thời cho ảnh
  const [addressOption, setAddresOption] = useState<any>();
  const addressSelect =
    addressOption?.ward.name +
    ", " +
    addressOption?.district.name +
    ", " +
    addressOption?.city.name;

  for (const image of imageArray) {
    const imageUrl = URL.createObjectURL(image);
    imageUrls.push(imageUrl);
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>();

  const { profile, userWithId } = useAppSelector((state) => state.user);
  const avatar = watch("imageUrl");
  const [_data, setData] = useState<any>();

  useEffect(() => {
    const _getData = async () => {
      const res = await dispatch(getUser(""));
      await unwrapResult(res);
      await setData(res?.payload?.data);
      await dispatch(getUserById(res?.payload?.data.data.id));
    };
    _getData();
  }, []);

  useEffect(() => {
    setImages(userWithId.imageUrl);

    setValue("fullName", userWithId.fullName);
    setValue("phoneNumber", userWithId.phoneNumber);
    setValue("address", userWithId.address);
    setValue("imageUrl", userWithId.imageUrl);
    setValue("email", userWithId.email);
    setValue("gender", userWithId.gender?.toString());
  }, [userWithId, setValue]);
  const onSubmit = handleSubmit(async (data) => {
    const body = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      password: data.password,
      email: data.email,
      gender: Number(data.gender),
      address: data.address + " " + addressSelect,
      imageUrl: data.imageUrl,
      isEnable: true,
    };
    try {
      let images = [];

      if (file) {
        const form = new FormData();
        for (let i = 0; i < file.length; i++) {
          form.append("files", file[i]);
        }
        const res = await dispatch(uploadManyImages(form));
        unwrapResult(res);
        const d = res?.payload?.data?.data;
        for (let i = 0; i < d.length; i++) {
          images.push(d[i]?.fileUrl);
        }
      }
      const res = await dispatch(
        updateProfile({ id: userWithId.id, body }),
      ).then(unwrapResult);

      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      toast.success("Cập nhật thành công");
      dispatch(getUserById(userWithId.id));
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

  const handleChangeFile = (file?: File[]) => {
    setFile(file);
  };

  return (
    <div className="container rounded-sm bg-white px-2 pl-5 pb-10 shadow md:px-7 md:pb-20">
      <Helmet>
        <title>Hồ sơ của tôi </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-2xl font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi
        </h1>
        <div className="mt-1 text-xl text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      <form
        className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div>
            {" "}
            {userWithId.isEnable ? (
              <Button
                style={{}}
                disabled
                className="flex h-12 cursor-text  w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
                type="reset"
              >
                Tài khoản đã kích hoạt
              </Button>
            ) : (
              <Button
                style={{}}
                className="cursor-pointer flex h-12   w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
                type="reset"
                onClick={() => navigate(path.sendCodeActive)}
              >
                Kích hoạt tài khoản
              </Button>
            )}
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Email:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="email"
                type="text"
                placeholder="Họ Tên"
                defaultValue={profile?.email}
                errorMessage={errors.email?.message}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Họ Tên:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="fullName"
                type="text"
                placeholder="Họ Tên"
                errorMessage={errors.fullName?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Số điện thoại:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="phoneNumber"
                type="text"
                placeholder="Họ Tên"
                errorMessage={errors.phoneNumber?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Mật khẩu
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="password"
                type="text"
                placeholder="*********"
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Địa chỉ:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="address"
                type="text"
                placeholder="Số nhà, tên đường..."
                errorMessage={errors.address?.message}
              />
              <LocationForm
                onChange={(e: any) => {
                  setAddresOption(e);
                }}
              />
            </div>
          </div>
          <SelectCustom
            className={"flex-1 text-black"}
            id="gender"
            placeholder="Giới tính"
            options={[
              { id: 1, name: "Nam" },
              { id: 2, name: "Nữ" },
            ]}
            register={register}
          >
            {errors.gender?.message}
          </SelectCustom>
          <Button
            className="flex h-12 w-12 items-center border-blue-500 border-solid  rounded-sm   text-center text-2xl text-black "
            type="submit"
          >
            Lưu
          </Button>
          <div className="mt-2 flex flex-row justify-start flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
            <div className="sm:w-[80%] sm:pl-5 "></div>
          </div>
        </div>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              {imageUrls?.map((imageUrl, index) => {
                return (
                  <img
                    key={index}
                    src={imageUrl || avatar}
                    className="h-full rounded-md w-full  object-cover"
                    alt="avatar"
                  />
                );
              })}
            </div>
            <InputFile
              id="files"
              label="Upload ảnh"
              onChange={handleChangeFile}
            />
            <div className="mt-3 text-gray-400">
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
      <div className="sm:w-[80%] sm:pl-5">
        <Button
          style={{}}
          className="cursor-pointer flex h-12   w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
          type="reset"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
}

