import useSocket from "./useSocket";
import { useEffect } from "react";
import { ServerToClientEvents } from "../common/types";

const useEvent = (
  event: keyof ServerToClientEvents,
  handler: ServerToClientEvents[keyof ServerToClientEvents],
  dependencies: any[] = []
) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.connection.on(event, handler);
  }, dependencies);

  return {};
};

export default useEvent;
