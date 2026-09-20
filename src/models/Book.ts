import { IBook } from './interfaces/IBook';

export class Book implements IBook {
  public id: string;
  public title: string;
  public author: string;
  public year: number;
  public isBorrowed: boolean;
  public borrowedByUserId: string | null;

  constructor(title: string, author: string, year: number, id = crypto.randomUUID()) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = false;
    this.borrowedByUserId = null;
  }

  public getInfo(): string {
    return `${this.title} by ${this.author} (${this.year})`;
  }
}
