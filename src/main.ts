import { bootstrapHttpServer } from './bootstrap';

/* eslint-disable no-console, unicorn/no-process-exit */
// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrapHttpServer().catch((error: Error) => {
  console.error(`Unexpected error has occurred: ${error.stack}`); // eslint-disable-line no-console
  process.exit(1);
});
