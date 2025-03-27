import { CSSProperties, Suspense } from "react";
import { animated, useTransition } from "react-spring";
import { lazyLoad } from "../utils/lazyLoad";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { Fallback } from "@/views/layout/Fallback";
import { AuthGuard } from "./AuthGuard";
import { SidebarLayout } from "@/views/layout/Sidebar";

const { SignIn } = lazyLoad(() => import("@/views/pages/SignIn"));
const { Agencies } = lazyLoad(() => import("@/views/pages/Agencies"));
const { AgencyDetail } = lazyLoad(() => import("@/views/pages/AgencyDetail"));
const { Dashboard } = lazyLoad(() => import("@/views/pages/Dashboard"));

export function Router() {
  const location = useLocation();

  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: "translateY(50px)",
      position: "absolute",
      width: "100%",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0)",
      position: "absolute",
      width: "100%",
    },
    leave: {
      opacity: 0,
      transform: "translateY(50px)",
      position: "absolute",
      width: "100%",
    },
    config: { tension: 200, friction: 20 },
  });

  return transitions((props, item) => (
    <animated.div style={props as unknown as CSSProperties}>
      <Suspense fallback={<Fallback />}>
        <Routes location={item}>
          <Route element={<AuthGuard isPrivate />}>
            <Route element={<SidebarLayout />}>
              <Route
                path="/"
                element={<Navigate to={routes.dashboard} replace />}
              />
              <Route path={routes.dashboard} element={<Dashboard />} />

              <Route path={routes.agencies}>
                <Route index element={<Agencies />} />
                <Route path="new" element={<Agencies />} />
              </Route>

              <Route path={routes.agencyDetail}>
                <Route index element={<AgencyDetail />} />
                <Route path="edit" element={<AgencyDetail />} />
              </Route>
            </Route>
          </Route>

          <Route element={<AuthGuard isPrivate={false} />}>
            <Route path={routes.signIn} element={<SignIn />} />
          </Route>
        </Routes>
      </Suspense>
    </animated.div>
  ));
}
