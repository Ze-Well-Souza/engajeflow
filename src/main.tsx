
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import { createAdminUserIfNotExists } from "./integrations/supabase/initAdminUser";

// Inicializar usuário administrador para teste
createAdminUserIfNotExists().catch(console.error);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="top-right" richColors />
    <App />
  </React.StrictMode>
);
