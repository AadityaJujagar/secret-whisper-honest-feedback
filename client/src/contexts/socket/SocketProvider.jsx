import { SocketContext } from "./SocketContext";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const rawBase = import.meta.env.VITE_APP_BASE_URL || window.location.origin;
    let socketUrl = rawBase;
    try {
      socketUrl = new URL(rawBase).origin;
    } catch (e) {
      socketUrl = rawBase;
      console.log(e);
    }

    const token = user?.token || null;
    socketRef.current = io(socketUrl, {
      withCredentials: true,
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
    });

    setSocket(socketRef.current);

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connect_error:", err?.message || err);
    });

    socketRef.current.on("error", (err) => {
      console.error("Socket error:", err);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
