import { useEffect, useState } from "react";
import { LobbiesController } from "../api";
import { TLobby } from "../common/types";
import useLoading from "./useLoading";

const useLobby = (id: string, onError: (error: any) => void) => {
  const [lobby, setLobby] = useState<TLobby>({} as any);
  const { execute, isLoading } = useLoading(async () => {
    const lobby = await LobbiesController.getOne(id);
    setLobby(lobby);
  }, onError);

  useEffect(() => {
    execute();
  }, [id]);

  return { lobby, isLoading };
};

export default useLobby;
