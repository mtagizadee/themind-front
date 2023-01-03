export const isNotEmpty = (value: any | any[]) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== "" && value !== null && value !== undefined;
};

export const lengthRange = (min: number, max: number) => (value: string) => {
  return value.length >= min && value.length <= max;
};
