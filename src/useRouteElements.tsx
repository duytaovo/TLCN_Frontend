import path from "src/constants/path";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { productDetailRoutes, routeAuth, routeMain } from "./routes";
import CommonLayout from "./layouts/CommonLayout";
import AuthenticatedGuard from "./guards/AuthenticatedGuard";
import AuthLayout from "./layouts/AuthLayout";

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
  const renderRouterAuth = useMemo(() => {
    return routeAuth.map(({ path, Component }, index) => {
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
      <Route path="" element={<AuthLayout />}>
        {renderRouterAuth}
      </Route>
    </Routes>
  );

  return <>{routeElements}</>;
}
