export enum ErrorKey {
  NE = "no error",
  NR = "nickname required",
  NL = "nickname length",
  NOPR = "number of players required",
  NOL = "number of players length",
  NOPNI = "number of players not integer",
}

export type TValidationError = {
  key: ErrorKey;
  message: string;
};

export const VALIDATION_ERROR_INITIAL_STATE: TValidationError = {
  key: ErrorKey.NE,
  message: "",
};
