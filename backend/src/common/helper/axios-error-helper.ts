import { AxiosError } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  if (!error) {
    return false;
  }
  return typeof error === 'object' && 'isAxiosError' in error;
}
