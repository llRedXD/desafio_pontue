import { Outlet, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { PostPage } from "../pages/PostPage";
import { User } from "../pages/User";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route
          path="posts/:id"
          element={
            <PostPage id={Number(window.location.pathname.split("/").pop())} />
          }
        />
        <Route path="user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
