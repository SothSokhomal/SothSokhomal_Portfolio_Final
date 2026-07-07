/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly APP_URL?: string;
  readonly MY_API_KEY?: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.pdf";