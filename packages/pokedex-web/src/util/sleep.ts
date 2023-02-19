/**
 * Halts the current thread to invoke an event loop.
 *
 * @param ms -
 *        The total number of milliseconds to sleep.
 *
 * @returns
 *        A promise that resolves after ms milliseconds.
 */
export function sleep(ms = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
