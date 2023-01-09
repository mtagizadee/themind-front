export const fixResponseDate = (responseDate: string) => {
  return new Date(responseDate).toISOString().split("T")[0];
};
