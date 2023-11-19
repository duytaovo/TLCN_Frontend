import { lazy } from "react";
import path from "src/constants/path";

const CodeValidator = lazy(
  () => import("src/pages/Auth/ForgotPasword/ValidatorCode")
);
const Home = lazy(() => import("src/pages/Home/Home"));
const Payment = lazy(() => import("src/pages/Payment/Payment"));
const CodeValidatorActiveAccount = lazy(
  () => import("src/pages/Auth/AcctiveAccount/ValidatorCode")
);
const ActiveAccount = lazy(() => import("src/pages/Auth/AcctiveAccount"));
const ForgotPassword = lazy(() => import("src/pages/Auth/ForgotPasword"));
const Accessory = lazy(() => import("src/pages/Accessory/Accessory"));
const History = lazy(() => import("src/pages/History/History"));
const LapTop = lazy(() => import("src/pages/Laptop/LapTop"));
const Maycu = lazy(() => import("src/pages/Maycu/Maycu"));
const NotFound = lazy(() => import("src/pages/NotFound "));
const Phone = lazy(() => import("src/pages/Phone/Phone"));
const ProductDetail = lazy(
  () => import("src/pages/ProductDetail/SmartPhoneDetail")
);
const Samsung = lazy(() => import("src/pages/Samsung/Samsung"));
const SmartWatch = lazy(() => import("src/pages/Smartwatch/SmartWatch"));
const Tablet = lazy(() => import("src/pages/Tablet/Tablet"));
const Lenovo = lazy(() => import("src/pages/Lenovo/Lenovo"));
const Pc = lazy(() => import("src/pages/Pc/Pc"));

const Login = lazy(() => import("src/pages/Auth/Login"));
const Register = lazy(() => import("src/pages/Auth/Register"));

const Profile = lazy(() => import("src/pages/User/pages/Profile"));
const CartNew = lazy(() => import("src/pages/CartNew"));
// const ChangePassword = lazy(
//   () => import("src/pages/User/pages/ChangePassword")
// );

export const routeMain = [
  {
    path: path.home,
    Component: Home,
  },
  {
    path: path.phone,
    Component: Phone,
  },
  {
    path: path.laptop,
    Component: LapTop,
  },
  {
    path: path.tablet,
    Component: Tablet,
  },
  {
    path: path.smartwatch,
    Component: SmartWatch,
  },
  {
    path: path.maycu,
    Component: Maycu,
  },
  {
    path: path.accessory,
    Component: Accessory,
  },

  {
    path: path.samsung,
    Component: Samsung,
  },

  {
    path: path.lenovo,
    Component: Lenovo,
  },
  {
    path: path.pc,
    Component: Pc,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const urls: string[] = [
  "smartphone/detail/:productSlug",
  "laptop/detail/:productSlug",
  "tablet/detail/:productSlug",
  "watch/detail/:productSlug",
  "man-hinh-may-tinh/detail/:productSlug",
  "may-tinh-de-ban/detail/:productSlug",
  "accessory/detail/:productSlug",
  "smartwatch/detail/:productSlug",
];

export const productDetailRoutes = urls.map((url) => ({
  path: url,
  Component: ProductDetail,
}));

export const routeAuth = [
  {
    path: path.login,
    Component: Login,
  },
  {
    path: path.register,
    Component: Register,
  },

  {
    path: path.forgotPassword,
    Component: ForgotPassword,
  },
  {
    path: path.sendCode,
    Component: CodeValidator,
  },
  // {
  //   path: path.profile,
  //   Component: ProfileNew,
  // },
];

export const routeUser = [
  {
    path: path.profile,
    Component: Profile,
  },
  {
    path: path.payment,
    Component: Payment,
  },
  {
    path: path.cartNew,
    Component: CartNew,
  },
  {
    path: path.activeAccount,
    Component: ActiveAccount,
  },
  {
    path: path.sendCodeActive,
    Component: CodeValidatorActiveAccount,
  },
  // {
  //   path: path.changePassword,
  //   Component: ChangePassword,
  // },

  {
    path: path.historyPurchase,
    Component: History,
  },
];
