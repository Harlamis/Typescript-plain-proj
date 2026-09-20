export interface IIdentifiable {
  id: string;
}

export class Library<T extends IIdentifiable> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }

  public add(item: T): void {
    this.items.push(item);
  }

  public remove(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }

  public find(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  public size(): number {
    return this.items.length;
  }
}
