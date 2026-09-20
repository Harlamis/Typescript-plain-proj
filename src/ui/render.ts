import { Book } from '../models/Book';
import { User } from '../models/User';
import { IBook } from '../models/interfaces/IBook';
import { IUser } from '../models/interfaces/IUser';
import { Library } from '../services/Library';
import { NotificationService } from '../services/NotificationService';
import { StorageService } from '../services/Storage';
import { generateNumericId } from '../utils/idGenerator';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';

const BOOKS_KEY = 'library-books';
const USERS_KEY = 'library-users';

export class AppRenderer {
  private root: HTMLElement;
  private books: Library<IBook>;
  private users: Library<IUser>;
  private searchTerm = '';
  private currentPage = 1;

  constructor(root: HTMLElement) {
    this.root = root;
    const storedBooks = StorageService.load<IBook>(BOOKS_KEY, [
      {
        id: '1',
        title: 'Code Complete',
        author: 'Steve McConnell',
        year: 2004,
        isBorrowed: false,
        borrowedByUserId: null,
      },
      {
        id: '2',
        title: 'Clean Code',
        author: 'Robert Martin',
        year: 2008,
        isBorrowed: false,
        borrowedByUserId: null,
      },
      {
        id: '3',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        year: 1999,
        isBorrowed: false,
        borrowedByUserId: null,
      },
    ]);
    const storedUsers = StorageService.load<IUser>(USERS_KEY, [
      new User('1725533394038', 'Артем', 'artemkarachevstev@gmail.com'),
      new User('1725533377985', 'Мартін', 'martin@softwar.com'),
    ]);

    this.books = new Library<IBook>(storedBooks);
    this.users = new Library<IUser>(storedUsers);
  }

  public render(): void {
    const filteredBooks = this.books.getAll().filter((book) => {
      const term = this.searchTerm.trim().toLowerCase();
      if (!term) return true;
      return `${book.title} ${book.author}`.toLowerCase().includes(term);
    });

    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
    this.currentPage = Math.min(this.currentPage, totalPages);
    const startIndex = (this.currentPage - 1) * pageSize;
    const visibleBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

    this.root.innerHTML = `
      <div class="min-h-screen bg-gray-100 px-4 py-8 font-sans">
        <div class="mx-auto max-w-4xl space-y-6">
          <h1 class="text-center text-3xl font-bold text-black">Система Управління Бібліотекою</h1>
          ${BookForm.render()}
          ${UserForm.render()}
          ${BookList.render(visibleBooks, this.currentPage, totalPages, this.searchTerm)}
          ${UserList.render(this.users.getAll())}
        </div>
      </div>
    `;

    this.attachFormHandlers();
    this.attachActionHandlers();
  }

  private attachFormHandlers(): void {
    const bookForm = document.getElementById('book-form') as HTMLFormElement | null;
    if (bookForm) {
      bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const errors = BookForm.validate(bookForm);
        this.showFieldErrors(bookForm, errors);
        if (Object.keys(errors).length > 0) return;

        const formData = new FormData(bookForm);
        const title = String(formData.get('title') ?? '').trim();
        const author = String(formData.get('author') ?? '').trim();
        const year = Number(String(formData.get('year') ?? ''));

        const book = new Book(title, author, year);
        this.books.add(book);
        StorageService.save(BOOKS_KEY, this.books.getAll());
        bookForm.reset();
        this.render();
      });
    }

    const userForm = document.getElementById('user-form') as HTMLFormElement | null;
    if (userForm) {
      userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const errors = UserForm.validate(userForm);
        this.showFieldErrors(userForm, errors);
        if (Object.keys(errors).length > 0) return;

        const formData = new FormData(userForm);
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();

        const user = new User(generateNumericId(), name, email);
        this.users.add(user);
        StorageService.save(USERS_KEY, this.users.getAll());
        userForm.reset();
        this.render();
      });
    }

    const searchInput = document.querySelector(
      '[data-role="book-search"]',
    ) as HTMLInputElement | null;
    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        this.searchTerm = (event.target as HTMLInputElement).value;
        this.currentPage = 1;
        this.render();
      });
    }
  }

  private attachActionHandlers(): void {
    const pageButtons = document.querySelectorAll('[data-page]');
    pageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-page');
        if (!value) return;

        if (value === 'prev') {
          this.currentPage = Math.max(1, this.currentPage - 1);
        } else if (value === 'next') {
          this.currentPage = this.currentPage + 1;
        } else {
          this.currentPage = Number(value);
        }

        this.render();
      });
    });

    const borrowButtons = document.querySelectorAll('[data-action="borrow"]');
    borrowButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-book-id');
        if (id) {
          this.handleBorrow(id);
        }
      });
    });

    const returnButtons = document.querySelectorAll('[data-action="return"]');
    returnButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-book-id');
        if (id) {
          this.handleReturn(id);
        }
      });
    });

    const deleteBookButtons = document.querySelectorAll('[data-action="delete-book"]');
    deleteBookButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-book-id');
        if (id) {
          this.handleDeleteBook(id);
        }
      });
    });

    const deleteUserButtons = document.querySelectorAll('[data-action="delete-user"]');
    deleteUserButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-user-id');
        if (id) {
          this.handleDeleteUser(id);
        }
      });
    });
  }

  private showFieldErrors(form: HTMLFormElement, errors: Record<string, string>): void {
    const controls = form.querySelectorAll('input');
    controls.forEach((input) => {
      const fieldName = input.getAttribute('name');
      const errorNode = input.parentElement?.querySelector('p');
      if (!fieldName || !errorNode) return;

      const errorText = errors[fieldName];
      const hasError = Boolean(errorText);
      input.classList.toggle('border-red-500', hasError);
      input.classList.toggle('focus:ring-red-500', hasError);
      errorNode.textContent = errorText ?? '';
      errorNode.classList.toggle('hidden', !hasError);
    });
  }

  private handleBorrow(bookId: string): void {
    const book = this.books.find(bookId);
    if (!book) return;

    NotificationService.showBorrowPrompt(
      `${book.title} by ${book.author} (${book.year})`,
      (id) => {
        const user = this.users.find(id);
        if (!user) {
          NotificationService.showInfo('Користувача з таким ID не знайдено.', 'Зрозуміло!');
          return;
        }

        if (user.borrowedBookIds.length >= 3) {
          NotificationService.showInfo(
            `Користувач ${user.name} вже позичив 3 книги! Максимальний ліміт вичерпано.`,
            'Зрозуміло!',
          );
          return;
        }

        book.isBorrowed = true;
        book.borrowedByUserId = user.id;
        user.addBorrowedBook(book.id);
        StorageService.save(BOOKS_KEY, this.books.getAll());
        StorageService.save(USERS_KEY, this.users.getAll());
        this.render();
        NotificationService.showInfo(
          `${book.title} by ${book.author} (${book.year}) has been borrowed by ${user.id} ${user.name} (${user.email}).`,
          'Зрозуміло!',
        );
      },
      () => undefined,
    );
  }

  private handleReturn(bookId: string): void {
    const book = this.books.find(bookId);
    if (!book || !book.isBorrowed) return;

    const user = this.users.find(book.borrowedByUserId ?? '');
    if (user) {
      user.removeBorrowedBook(book.id);
    }

    book.isBorrowed = false;
    book.borrowedByUserId = null;
    StorageService.save(BOOKS_KEY, this.books.getAll());
    StorageService.save(USERS_KEY, this.users.getAll());
    this.render();
    NotificationService.showInfo(
      `${book.title} by ${book.author} (${book.year}) has been returned.`,
      'Закрити',
    );
  }

  private handleDeleteBook(bookId: string): void {
    const book = this.books.find(bookId);
    if (!book) return;

    if (book.isBorrowed && book.borrowedByUserId) {
      const user = this.users.find(book.borrowedByUserId);
      if (user) {
        user.removeBorrowedBook(book.id);
      }
    }

    this.books.remove(bookId);
    StorageService.save(BOOKS_KEY, this.books.getAll());
    StorageService.save(USERS_KEY, this.users.getAll());
    this.render();
  }

  private handleDeleteUser(userId: string): void {
    const user = this.users.find(userId);
    if (!user) return;

    const hasOpenBooks = user.borrowedBookIds.length > 0;
    if (hasOpenBooks) {
      NotificationService.showInfo(
        'Неможливо видалити користувача з активними позичками.',
        'Зрозуміло!',
      );
      return;
    }

    this.users.remove(userId);
    StorageService.save(USERS_KEY, this.users.getAll());
    this.render();
  }
}
