import { lobbyFactory } from "../common/types";
import { privateApi } from "./config";

export class LobbiesController {
  /**
   * Send request to create a new lobby with given number of players
   * @param playersNumber number of players that will be in the lobby
   * @returns id of the created lobby
   */
  static async create(playersNumber: number) {
    const url = "/lobbies";
    const response = await privateApi.post(url, { playersNumber });
    return response.data.id;
  }

  /**
   * Send request to fetch lobby data
   * @param id - id of the lobby that we want to fetch
   * @returns lobby object
   */
  static async getOne(id: string) {
    const url = `/lobbies/${id}`;
    const response = await privateApi.get(url);
    return lobbyFactory(response.data);
  }

  /**
   * Sends request to join the lobby
   * @param id - id of the lobby that we want to join
   * @returns wsToken - token that will be used to connect to the lobby websocket
   */
  static async join(id: string) {
    const url = `/lobbies/${id}/join`;
    const response = await privateApi.patch(url);
    return response.data.wsToken;
  }

  /**
   * Send request to leave the lobby
   * @param id - id of the lobby that we want to leave
   * @returns message that user successfully left the lobby
   */
  static async leave(id: string) {
    const url = `/lobbies/${id}/leave`;
    const response = await privateApi.patch(url);
    return response.data;
  }
}
