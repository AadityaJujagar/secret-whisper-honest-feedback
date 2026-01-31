import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/auth/AuthProvider.jsx";
import "./index.css";
import { CommentProvider } from "./contexts/comment/CommentProvider.jsx";
import { SocketProvider } from "./contexts/socket/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <CommentProvider>
          <App />
          <Toaster position="top-right" />
        </CommentProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
);
