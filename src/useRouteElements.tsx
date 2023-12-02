import path from "src/constants/path";
import { Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import {
  accessRoutes,
  productDetailRoutes,
  routeAuth,
  routeMain,
  routeUser,
} from "./routes";
import CommonLayout from "./layouts/CommonLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import UserLayout from "./pages/User/layouts/UserLayout";
import UnAuthenticatedGuard from "./guards/UnAuthenticatedGuard";
import AuthenticatedGuard from "./guards/AuthenticatedGuard";

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

  const renderRouterPhuKien = useMemo(() => {
    return accessRoutes.map(({ path, Component }, index) => {
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
      <Route path={path.accessory} element={<CommonLayout />}>
        {renderRouterPhuKien}
      </Route>
      <Route
        path=""
        element={
          <AuthenticatedGuard>
            <AuthLayout />
          </AuthenticatedGuard>
        }
      >
        {renderRouterAuth}
      </Route>
      <Route
        path="/user"
        element={
          <UnAuthenticatedGuard>
            <UserLayout />
          </UnAuthenticatedGuard>
        }
      >
        {renderRouterUser}
      </Route>
    </Routes>
  );

  return <>{routeElements}</>;
}

