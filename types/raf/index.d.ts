declare module 'raf' {
  export function polyfill(window?: {}): void;

  namespace RAF {}
}
