import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";

import SharedLayout from "./SharedLayout";
import RequiresAuth from "./RequiresAuth";
import { authRoutes, contentRoutes } from "./publicRoutes";
import { adminRoutes, privateRoutes } from "./privateRoutes";

import { ErrorPage, Home } from "../pages";
import { useAuthContext } from "../contexts";
import AdminLayout from "./AdminLayout";

const Index = () => {
  const { token } = useAuthContext();
  const location = useLocation();

  return (
    <Routes>
      <Route element={token ? <Navigate to={location?.state?.from?.pathname ?? "/"} replace={true} /> : <Outlet />}>
        {authRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} exact />
        ))}
      </Route>
      <Route element={<SharedLayout />}>
        <Route path="/" element={<Home />} index />
        <Route path="*" element={<ErrorPage />} />
        {contentRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        <Route element={<RequiresAuth />}>
          {privateRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route element={token ? <Navigate to={location?.state?.from?.pathname ?? "/admin_product"} replace={true} /> : <Outlet />}>
        {authRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} exact />
        ))}
      </Route>
      <Route element={<AdminLayout />}>
        {adminRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export { Index };
