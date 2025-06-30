import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={"/"}>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
