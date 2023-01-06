import { privateApi } from "./config";

export class LobbiesController {
  /**
   * Send request to create a new lobby with given number of players
   * @param playersNumber number of players that will be in the lobby
   * @returns id of the created lobby
   */
  static async create(playersNumber: number) {
    const url = "/create";
    const response = await privateApi.post(url, { playersNumber });
    return response.data.id;
  }
}
