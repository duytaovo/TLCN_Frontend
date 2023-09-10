import path from "src/constants/path";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { productDetailRoutes, routeMain } from "./routes";
import CommonLayout from "./layouts/CommonLayout";

export default function useRouteElements() {
  const renderRouter = useMemo(() => {
    return routeMain.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense>
              <Component name="" title="" slug={{ slug: "" }} />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const renderRouterDetail = useMemo(() => {
    return productDetailRoutes.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const routeElements = (
    <Routes>
      <Route path="" element={<CommonLayout />}>
        {renderRouter}
      </Route>
      <Route path="/" element={<CommonLayout />}>
        {renderRouterDetail}
      </Route>
    </Routes>
  );

  return (
    <>
      {routeElements}
      {/* {dataLength ? routeElements : <div></div>}
      <div
        className={`duration-700 transition-all fixed w-full bottom-0 overflow-hidden z-[9999999] bg-mainL1 flex justify-center items-center ${
          !isLoading ? "h-0 rounded-tl-[100%] rounded-tr-[100%]" : "h-full"
        }`}
      >
        <div className="flex flex-col items-center ">
          <div className="px-2 py-1 bg-white w-[150px]">
            <img
              src="/logo.jpg"
              alt="logo"
              className="fill-current bg-none h-[36px] w-full "
            />
          </div>
          <div className="py-2">Loading...</div>
        </div>
      </div> */}
    </>
  );
}
