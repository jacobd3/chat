import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthUserProvider } from "./providers/AuthUserProvider.tsx";
import App from "./App.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
  </StrictMode>
);
