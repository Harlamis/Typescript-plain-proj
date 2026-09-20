export class StorageService {
  static load<T>(key: string, fallback: T[]): T[] {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }

      const parsed = JSON.parse(raw) as T[];
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return fallback;
    }
  }

  static save<T>(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
