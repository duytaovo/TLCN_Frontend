import { lazy } from "react";
import { Laptop } from "src/components/Icons";
import path from "src/constants/path";
import Accessory from "src/pages/Accessory/Accessory";
import Cart from "src/pages/Cart/Cart";
import History from "src/pages/History/History";
import Home from "src/pages/Home/Home";
import LapTop from "src/pages/Laptop/LapTop";
import Maycu from "src/pages/Maycu/Maycu";
import Phone from "src/pages/Phone/Phone";
import ProductDetail from "src/pages/ProductDetail/ProductDetail";
import Samsung from "src/pages/Samsung/Samsung";
import SmartWatch from "src/pages/Smartwatch/SmartWatch";
import Tablet from "src/pages/Tablet/Tablet";

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
];

const urls = [
  "dienthoai/:productSlug",
  "laptop/:productSlug",
  "tablet/:productSlug",
  "watch/:productSlug",
  "may-in/:productSlug",
  "muc-in/:productSlug",
  "man-hinh-may-tinh/:productSlug",
  "may-tinh-de-ban/:productSlug",
  "phukien/:productSlug",
  "smartwatch/:productSlug",
];
export const productDetailRoutes = urls.map((url) => ({
  path: url,
  Component: ProductDetail,
}));
export const routeDetail = [
  {
    path: path.dienthoaiDetail,
    Component: ProductDetail,
  },
];
