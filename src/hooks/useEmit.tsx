import useSocket from "./useSocket";
import { ClientToServerEvents } from "../common/types";

/**
 * useEmit is a custom hook that wraps the socket.io emit function
 * @param event - event name to emit to the server
 * @param data  - data to send to the server
 * @param handler - callback function to handle the response from the server
 * @returns a function that emits the event to the server
 */
const useEmit = (
  event: keyof ClientToServerEvents,
  data: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>[0],
  handler: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>[1]
) => {
  const { socket } = useSocket();

  return () => {
    socket.connection.emit(event, data, handler as unknown as any);
  };
};

export default useEmit;
