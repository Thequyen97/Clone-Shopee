export interface SuccessResponse<Data> {
  message: string
  data?: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
// CÚ PHÁP '-?' sẽ loại bỏ underfiend của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
