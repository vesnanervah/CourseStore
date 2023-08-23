// This fixes TypeScript error when importing .svg
declare module '*.svg' {
  export const content: string;
  export const viewBox: string;
  export const id: string;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}
