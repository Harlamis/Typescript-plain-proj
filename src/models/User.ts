import { IUser } from './interfaces/IUser';

export class User implements IUser {
  public id: string;
  public name: string;
  public email: string;
  public borrowedBookIds: string[];

  constructor(id: string, name: string, email: string, borrowedBookIds: string[] = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBookIds = borrowedBookIds;
  }

  public addBorrowedBook(bookId: string): void {
    if (!this.borrowedBookIds.includes(bookId)) {
      this.borrowedBookIds.push(bookId);
    }
  }

  public removeBorrowedBook(bookId: string): void {
    this.borrowedBookIds = this.borrowedBookIds.filter((id) => id !== bookId);
  }
}
