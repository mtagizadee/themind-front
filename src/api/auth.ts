import { privateApi, publicApi } from "./config";

export class AuthController {
  /**
   * Sends a request to the server to add a new user
   * @param nickname string
   * @returns jwtToken
   */
  static async addUser(nickname: string) {
    const url = "/auth/add-user";
    const response = await publicApi.post(url, { nickname });
    return response.data.token;
  }

  /**
   * Sends a request to the server to get the data of client
   * @returns data of the current user
   */
  static async me() {
    const url = "/auth/me";
    const response = await privateApi.get(url);
    return response.data;
  }
}
