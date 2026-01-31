import { useContext } from "react";
import { SocketContext } from "../contexts/socket/SocketContext";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (socket === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return socket;
};
