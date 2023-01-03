export enum ErrorKey {
  NE = "no error",
  NR = "nickname required",
  NL = "nickname length",
}

export type TValidationError = {
  key: ErrorKey;
  message: string;
};

export const VALIDATION_ERROR_INITIAL_STATE: TValidationError = {
  key: ErrorKey.NE,
  message: "",
};
