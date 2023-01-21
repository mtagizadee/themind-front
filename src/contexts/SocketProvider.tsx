import React, { createContext, ReactNode, FC, useEffect } from "react";
import socket from "../common/socket";

type TSocketContext = {
  /**
   * Socket instance created in the common/socket directory
   */
  socket: typeof socket;
  /**
   * function that connects the socket
   * @returns void
   */
  connect: () => void;
  /**
   * function that disconnects the socket
   * @returns void
   */
  disconnect: () => void;
};

export const SocketContext = createContext<TSocketContext>({} as any);

interface ISocketProviderProps {
  children: ReactNode;
}

/**
 * This component keeps track of everything that happens in socket connection, for example errors
 * disconnect, connect and etc.
 * @returns JSX.Element which is the provider of the socket
 */
const SocketProvider: FC<ISocketProviderProps> = ({ children }) => {
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconect();
  };

  // Notify everything that happens with socket connection
  useEffect(() => {
    socket.connection.on("connect_error", (error) => {
      console.log(`The following connection error occured: ${error}`);
    });

    socket.connection.on("connect", () => {
      console.log("Socket connected");
    });

    socket.connection.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
