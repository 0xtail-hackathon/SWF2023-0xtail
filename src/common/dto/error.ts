export class CommonError {
  statusCode: number;
  code: string;
  message: string;
  error: string;
}
export class CommonErrorResponse {
  response: CommonError;
}
