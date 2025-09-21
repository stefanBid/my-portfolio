type CacheEntry<T = unknown> = { value: T; expiresAt: number };

export function createCache(
  namespace: string,
  defaultTtlSec = 300,
): {
  get: <T = unknown>(key: string) => T | null;
  set: <T = unknown>(key: string, value: T, ttlSec?: number) => void;
  del: (key: string) => void;
  clearLocale: (locale: string) => void;
} {
  const mem = new Map<string, CacheEntry>();
  const k = (key: string): string => `${namespace}:${key}`;

  /**
   * Retrieves a value from the cache.
   * @param key The key to retrieve.
   * @returns The cached value or null if not found.
   */
  function get<T = unknown>(key: string): T | null {
    const now = Date.now();
    const inMem = mem.get(key);
    if (inMem && inMem.expiresAt > now) return inMem.value as T;

    const raw = localStorage.getItem(k(key));
    if (!raw) return null;
    try {
      const parsed: CacheEntry = JSON.parse(raw);
      if (parsed.expiresAt > now) {
        mem.set(key, parsed);
        return parsed.value as T;
      } else {
        localStorage.removeItem(k(key));
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  /**
   * Stores a value in the cache.
   * @param key The key to store the value under.
   * @param value The value to store.
   * @param ttlSec The time-to-live for the cached value in seconds.
   */
  function set<T = unknown>(key: string, value: T, ttlSec = defaultTtlSec): void {
    const expiresAt = Date.now() + ttlSec * 1000;
    const entry: CacheEntry<T> = { value, expiresAt };
    mem.set(key, entry);
    localStorage.setItem(k(key), JSON.stringify(entry));
  }

  /**
   * Deletes a value from the cache.
   * @param key The key to delete.
   */
  function del(key: string): void {
    mem.delete(key);
    localStorage.removeItem(k(key));
  }

  /**
   * Clears all cache entries for a specific locale.
   * @param locale The locale to clear (e.g., 'en', 'it').
   */
  function clearLocale(locale: string): void {
    // rimuovi tutte le chiavi di uno specifico locale
    const prefix = `${namespace}:`;
    Object.keys(localStorage).forEach((lsKey) => {
      if (lsKey.startsWith(prefix)) {
        const logical = lsKey.slice(prefix.length);
        if (logical.includes(`|loc=${locale}|`)) {
          localStorage.removeItem(lsKey);
          mem.delete(logical);
        }
      }
    });
  }

  return { get, set, del, clearLocale };
}
