import { lazy } from "react";
import path from "src/constants/path";

const Home = lazy(() => import("src/pages/Home/Home"));
const Accessory = lazy(() => import("src/pages/Accessory/Accessory"));
const Cart = lazy(() => import("src/pages/Cart/Cart"));
const History = lazy(() => import("src/pages/History/History"));
const LapTop = lazy(() => import("src/pages/Laptop/LapTop"));
const Maycu = lazy(() => import("src/pages/Maycu/Maycu"));
const NotFound = lazy(() => import("src/pages/NotFound "));
const Phone = lazy(() => import("src/pages/Phone/Phone"));
const ProductDetail = lazy(
  () => import("src/pages/ProductDetail/ProductDetail")
);
const Samsung = lazy(() => import("src/pages/Samsung/Samsung"));
const SmartWatch = lazy(() => import("src/pages/Smartwatch/SmartWatch"));
const Tablet = lazy(() => import("src/pages/Tablet/Tablet"));
const Lenovo = lazy(() => import("src/pages/Lenovo/Lenovo"));
const Pc = lazy(() => import("src/pages/Pc/Pc"));

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
    path: path.cart,
    Component: Cart,
  },
  {
    path: path.samsung,
    Component: Samsung,
  },
  {
    path: path.history,
    Component: History,
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

const urls = [
  "phone/:productSlug",
  "laptop/:productSlug",
  "tablet/:productSlug",
  "watch/:productSlug",
  "may-in/:productSlug",
  "muc-in/:productSlug",
  "man-hinh-may-tinh/:productSlug",
  "may-tinh-de-ban/:productSlug",
  "accessory/:productSlug",
  "smartwatch/:productSlug",
];
export const productDetailRoutes = urls.map((url) => ({
  path: url,
  Component: ProductDetail,
}));
