import { CSSProperties, Suspense } from "react";
import { animated, useTransition } from "react-spring";
import { lazyLoad } from "../utils/lazyLoad";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { Fallback } from "@/views/layout/Fallback";
import { AuthGuard } from "./AuthGuard";

const { SignIn } = lazyLoad(() => import("@/views/pages/SignIn"));
const { Agencies } = lazyLoad(() => import("@/views/pages/Agencies"));

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
            <Route
              path="/"
              element={<Navigate to={routes.agencies} replace />}
            />
            <Route path={routes.agencies} element={<Agencies />} />
          </Route>

          <Route element={<AuthGuard isPrivate={false} />}>
            <Route path={routes.signIn} element={<SignIn />} />
          </Route>
        </Routes>
      </Suspense>
    </animated.div>
  ));
}
