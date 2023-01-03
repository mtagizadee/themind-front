import { publicApi } from "./config";

export class AuthController {
  static async addUser(nickname: string) {
    const url = "/auth/add-user";
    const response = await publicApi.post(url, { nickname });
    return response.data.token;
  }
}
