import { Light, Mikasa, Power, Purple } from "../../assets/players";

/**
 * Map of order to player data
 * @important
 * This data is static and cannot be changed.
 * It is used only for image and description of the player in lobby
 */
export const orderToPlayerData = {
  lobby: {
    1: {
      image: Mikasa,
      description: "Oh, no. Not this again...",
    },
    2: {
      image: Power,
      description: "Do you want to play with me?",
    },
    3: {
      image: Purple,
      description: "Are we too young for this?",
    },
    4: {
      image: Light,
      description: "I want you to do it again...",
    },
  },
  // TODO: Add player data for the players in the game...
  game: {},
};
