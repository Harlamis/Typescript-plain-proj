export interface IUser {
  id: string;
  name: string;
  email: string;
  borrowedBookIds: string[];
  addBorrowedBook(bookId: string): void;
  removeBorrowedBook(bookId: string): void;
}
