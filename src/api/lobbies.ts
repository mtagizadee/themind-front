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

  static async getOne(id: string) {
    const url = `/lobbies/${id}`;
    const response = await privateApi.get(url);
    return response.data;
  }
}
