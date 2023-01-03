export enum ErrorKey {
  NE = "no error",
  NR = "nickname required",
  NL = "nickname length",
}

export type ValidationError = {
  key: ErrorKey;
  message: string;
};

export const VALIDATION_ERROR_INITIAL_STATE: ValidationError = {
  key: ErrorKey.NE,
  message: "",
};
