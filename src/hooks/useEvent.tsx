import useSocket from "./useSocket";
import { useEffect } from "react";
import { ServerToClientEvents } from "../common/types";

/**
 * Hook that listens to socket events and calls handler function when event is emitted
 * @param event - event name that we want to listen to
 * @param handler  - handler function that will be called when event is emitted
 * @param dependencies  - dependencies array for useEffect
 * @returns void
 */
const useEvent = (
  event: keyof ServerToClientEvents,
  handler: ServerToClientEvents[keyof ServerToClientEvents],
  dependencies: any[] = []
) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.connection.on(event, handler);

    return () => {
      socket.connection.removeListener(event, handler);
    };
  }, dependencies);

  return {};
};

export default useEvent;
