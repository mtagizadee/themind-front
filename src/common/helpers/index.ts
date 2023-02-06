export * from "./deck";

export const fixResponseDate = (responseDate: string) => {
  return new Date(responseDate).toISOString().split("T")[0];
};

export const objectsAreEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const getNumbersTo = (to: number) => {
  return Array.from(Array(to).keys());
};

export const generateRandomAngle = () => {
  return Math.floor(Math.random() * 360);
};
