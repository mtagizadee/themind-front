import { gameFactory } from "../common/types";
import { privateApi } from "./config";

export class GamesController {
  static async findOne(id: string) {
    const url = "/games/" + id;
    const response = await privateApi.get(url);
    return gameFactory(response.data);
  }
}
