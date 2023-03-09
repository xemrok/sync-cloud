import { Storage } from './utils/storage';

export {};

declare global {
  interface Window {
    token: string | null | undefined;
    storage: Storage;
  }
}
