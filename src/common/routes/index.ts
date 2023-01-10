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
};

export const publicRoutes = {
  addUserPage: "/",
  notFoundPage: "/error",
  invite(id = ":id") {
    return `/invite/${id}`;
  },
};
