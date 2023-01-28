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
   * Sends request to generate invitation link for the lobby
   * @param id - id of the lobby that we want to generate invitation link for
   * @returns generated link
   */
  static async generateInvitationLink(id: string) {
    const url = `/lobbies/${id}/invitation-link`;
    const response = await privateApi.post(url);
    return response.data.link;
  }
}
