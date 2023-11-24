export function assertNotAsync<T>(fnr: T, name: string) {
  if (fnr instanceof Promise) {
    throw new Error(`'${name}' cannot be asynchronous.`);
  }
}
