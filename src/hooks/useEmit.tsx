import useSocket from "./useSocket";
import { ClientToServerEvents } from "../common/types";

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
