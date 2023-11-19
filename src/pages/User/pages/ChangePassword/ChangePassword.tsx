// import { yupResolver } from "@hookform/resolvers/yup";
// import { Button } from "@mui/material";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import Input from "src/components/Input";
// import { useAppDispatch } from "src/hooks/useRedux";
// import { updateProfile } from "src/store/user/userSlice";
// import { ErrorResponse } from "src/types/utils.type";
// import { userSchema, UserSchema } from "src/utils/rules";
// import { isAxiosUnprocessableEntityError } from "src/utils/utils";

// type FormData = Pick<
//   UserSchema,
//   "password" | "new_password" | "confirm_password"
// >;

// const passwordSchema = userSchema.pick([
//   "password",
//   "new_password",
//   "confirm_password",
// ]);

// export default function ChangePassword() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     setError,
//     reset,
//   } = useForm({
//     defaultValues: {
//       password: "",
//       confirm_password: "",
//       new_password: "",
//     },
//     resolver: yupResolver(passwordSchema),
//   });
//   const dispatch = useAppDispatch();

//   const onSubmit = handleSubmit(async (data) => {
//     const body = { password: data.password, new_password: data.new_password };

//     try {
//       await dispatch(updateProfile(body)).then(unwrapResult);
//       reset();
//       toast.success("Đổi mật khẩu thành công", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } catch (error) {
//       if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
//         const formError = error.response?.data.data;
//         if (formError) {
//           Object.keys(formError).forEach((key) => {
//             setError(key as keyof FormData, {
//               // message: formError[key as keyof FormData],
//               type: "Server",
//             });
//           });
//         }
//       }
//     }
//   });

//   return (
//     <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20 pl-5">
//       <div className="border-b border-b-gray-200 py-6">
//         <h1 className="text-2xl font-medium capitalize text-gray-900">
//           Đổi mật khẩu
//         </h1>
//         <div className="mt-1 text-xl text-gray-700">
//           Quản lý thông tin hồ sơ để bảo mật tài khoản
//         </div>
//       </div>
//       <form className="mt-8 mr-auto max-w-2xl" onSubmit={onSubmit}>
//         <div className="mt-6 flex-grow md:mt-0 md:pr-12">
//           <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
//             <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
//               Mật khẩu cũ:
//             </div>
//             <div className="sm:w-[80%] sm:pl-5">
//               <Input
//                 classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
//                 className="relative "
//                 register={register}
//                 name="password"
//                 type="password"
//                 placeholder="Mật khẩu cũ"
//                 errorMessage={errors.password?.message}
//               />
//             </div>
//           </div>
//           <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
//             <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
//               Mật khẩu mới:
//             </div>
//             <div className="sm:w-[80%] sm:pl-5">
//               <Input
//                 classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
//                 className="relative "
//                 register={register}
//                 name="new_password"
//                 type="password"
//                 placeholder="Mật khẩu mới"
//                 errorMessage={errors.new_password?.message}
//               />
//             </div>
//           </div>
//           <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
//             <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
//               Nhập lại mật khẩu:
//             </div>
//             <div className="sm:w-[80%] sm:pl-5">
//               <Input
//                 classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
//                 className="relative "
//                 register={register}
//                 name="confirm_password"
//                 type="password"
//                 placeholder="Nhập lại mật khẩu"
//                 errorMessage={errors.confirm_password?.message}
//               />
//             </div>
//           </div>
//           <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
//             <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
//             <div className="sm:w-[80%] sm:pl-5">
//               <Button
//                 style={{
//                   backgroundColor: "Highlight",
//                 }}
//                 className="flex h-12 w-12 items-center border-yellow-200 border-solid  rounded-sm  px-8 text-center text-sm text-black "
//                 type="submit"
//               >
//                 Lưu
//               </Button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
