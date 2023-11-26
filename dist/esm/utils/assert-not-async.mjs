// src/utils/assert-not-async.ts
function assertNotAsync(fnr, name) {
  if (fnr instanceof Promise) {
    throw new Error(`'${name}' cannot be asynchronous.`);
  }
}
export {
  assertNotAsync
};
