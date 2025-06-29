import { Outlet, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Post } from "../pages/Post";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route
          path="posts/:id"
          element={
            <Post id={Number(window.location.pathname.split("/").pop())} />
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* Add more routes here as needed */}
      </Route>
      {/* You can add more routes for other pages or components here */}
    </Routes>
  );
}
