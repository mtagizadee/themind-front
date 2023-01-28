export const privateRoutes = {
  lobbiesRoutes: {
    index: "/lobbies",
    get create() {
      return `${this.index}/create`;
    },
    lobby(id = ":id") {
      return `${this.index}/${id}`;
    },
  },

  game(id = ":id") {
    return `/game/${id}`;
  },
};

export const publicRoutes = {
  addUserPage: "/",
  notFoundPage: "/error",
  invite(id = ":id") {
    return `/invite/${id}`;
  },
};
