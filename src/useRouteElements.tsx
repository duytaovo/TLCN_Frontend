import path from "src/constants/path";
import { Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { productDetailRoutes, routeAuth, routeMain, routeUser } from "./routes";
import CommonLayout from "./layouts/CommonLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import UserLayout from "./pages/User/layouts/UserLayout";

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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const renderRouterUser = useMemo(() => {
    return routeUser.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
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
      <Route path="/user" element={<UserLayout />}>
        {renderRouterUser}
      </Route>
    </Routes>
  );

  return <>{routeElements}</>;
}
