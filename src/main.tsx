
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import { createAdminUserIfNotExists } from "./integrations/supabase/initAdminUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Criação do cliente de query
const queryClient = new QueryClient();

// Inicializar usuário administrador para teste
createAdminUserIfNotExists().catch(console.error);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
