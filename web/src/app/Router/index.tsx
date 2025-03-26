import { Suspense } from "react";
import { lazyLoad } from "../utils/lazyLoad";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Fallback } from "@/views/layout/Fallback";

const { SignIn } = lazyLoad(() => import("@/views/pages/SignIn"));

export function Router() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path={routes.signIn} element={<SignIn />} />
      </Routes>
    </Suspense>
  );
}
