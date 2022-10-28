export interface Result<TData> {
  success: boolean;
  message: string;
  data: TData;
}
