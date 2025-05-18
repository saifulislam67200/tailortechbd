export interface IQueruMutationErrorResponse {
  data: {
    message: string;
    errorMessages: { path: string; message: string }[];
    statusCode: number;
    success: boolean;
  };
}
