# Project Map: Library Management App

## 1) Project Overview
This project is a TypeScript-based library management application that lets a user:
- add books
- add users
- borrow and return books
- search books by title/author
- paginate book list
- delete books and users
- store data in browser localStorage

It uses:
- Vite as the build/dev tool
- TypeScript for type safety
- Tailwind CSS for styling
- plain DOM rendering without a framework

---

## 2) Project Structure

```text
Typescript-plain-proj/
├── app-design/                  # UI design references / mockups
├── src/
│   ├── index.ts                 # app entry point
│   ├── models/
│   │   ├── Book.ts              # Book model
│   │   ├── User.ts              # User model
│   │   └── interfaces/
│   │       ├── IBook.ts         # Book contract
│   │       └── IUser.ts         # User contract
│   ├── services/
│   │   ├── Library.ts           # Generic collection service
│   │   ├── NotificationService.ts # modal notifications
│   │   ├── Storage.ts           # localStorage wrapper
│   │   └── ...
│   ├── styles/
│   │   └── main.css             # global styles
│   ├── types/
│   │   └── index.ts             # reusable type definitions
│   ├── ui/
│   │   ├── render.ts            # main app renderer
│   │   └── components/
│   │       ├── BookForm.ts      # add-book form UI
│   │       ├── BookList.ts      # book list UI + pagination
│   │       ├── Modal.ts         # reusable modal dialog
│   │       ├── UserForm.ts      # add-user form UI
│   │       └── UserList.ts      # user list UI
│   ├── utils/
│   │   ├── idGenerator.ts       # numeric id generation
│   │   └── validators.ts        # validation logic
│   └── ...
├── tests/
│   ├── library.test.ts          # Library service tests
│   └── validation.test.ts       # Validation tests
├── index.html                  # app shell
├── package.json                # scripts and dependencies
├── vite.config.ts              # Vite config
├── tailwind.config.js          # Tailwind setup
├── postcss.config.js           # PostCSS config
├── webpack.config.js           # Webpack config (legacy / alternative)
├── tsconfig.json               # TypeScript config
├── PROJECT_MAP.md              # this documentation
└── package-lock.json
```

---

## 3) Main App Flow

### Entry point
`src/index.ts`
- imports the main stylesheet
- locates the `#app` root element
- creates `AppRenderer`
- calls `render()`

### App renderer
`src/ui/render.ts`
This is the central controller. It:
- loads books and users from localStorage
- creates `Library<IBook>` and `Library<IUser>` collections
- renders form blocks and lists
- attaches event listeners for:
  - form submission
  - search input
  - borrow / return actions
  - delete actions
  - page navigation

### Data lifecycle
- Models represent domain data (`Book`, `User`)
- `Library<T>` stores and manages generic arrays
- `StorageService` handles persistence in `localStorage`
- UI constantly re-renders after state changes

---

## 4) Models and Domain Objects

### `Book`
File: `src/models/Book.ts`

Properties:
- `id: string`
- `title: string`
- `author: string`
- `year: number`
- `isBorrowed: boolean`
- `borrowedByUserId: string | null`

Methods:
- `getInfo(): string` returns formatted description

Implementation notes:
- uses `crypto.randomUUID()` as default ID
- stores borrow status and linkage to a user

### `User`
File: `src/models/User.ts`

Properties:
- `id: string`
- `name: string`
- `email: string`
- `borrowedBookIds: string[]`

Methods:
- `addBorrowedBook(bookId: string): void`
- `removeBorrowedBook(bookId: string): void`

Implementation notes:
- prevents duplicate borrowed IDs
- tracks the books currently held by the user

### Interfaces
- `IBook.ts` defines the book contract
- `IUser.ts` defines the user contract and required methods

These interfaces ensure consistent structure across the application.

---

## 5) Services

### `Library<T>`
File: `src/services/Library.ts`

Purpose:
- generic collection service
- handles add/remove/find/getAll/filter logic

Key methods:
- `add(item: T)`
- `remove(id: string)`
- `find(id: string)`
- `getAll()`
- `filter(predicate)`
- `size()`

Why it matters:
- keeps data logic separate from UI logic
- supports multiple entity types by using generics

### `StorageService`
File: `src/services/Storage.ts`

Purpose:
- saves and loads an array from `localStorage`

Implementation:
- `load<T>(key, fallback)` reads from browser storage
- `save<T>(key, value)` writes JSON data
- catches parse/storage errors safely

### `NotificationService`
File: `src/services/NotificationService.ts`

Purpose:
- creates interactive modal prompts and informational dialogs

Features:
- `showBorrowPrompt(...)` asks for a user ID before borrowing
- `showInfo(...)` shows confirmation or warning messages

Depends on:
- `Modal` component

---

## 6) UI Components

### `BookForm`
File: `src/ui/components/BookForm.ts`

Responsibilities:
- renders the form for adding a book
- validates title, author, and year

Validation rules:
- title is required
- author is required
- year must be a 4-digit valid year

### `UserForm`
File: `src/ui/components/UserForm.ts`

Responsibilities:
- renders the form for adding a user
- validates name and email

Validation rules:
- name required
- email must match a valid email pattern

### `BookList`
File: `src/ui/components/BookList.ts`

Responsibilities:
- displays each book row
- shows borrow/return button
- shows delete button
- supports pagination
- supports search input

Important behavior:
- if a book is borrowed, button changes to `Повернути`
- if not borrowed, button is `Позичити`

### `UserList`
File: `src/ui/components/UserList.ts`

Responsibilities:
- renders a list of users
- displays each user ID and email
- provides delete option if no active borrow exists

### `Modal`
File: `src/ui/components/Modal.ts`

Responsibilities:
- reusable modal dialog component
- supports title, content, action buttons, and close handling
- used by `NotificationService`

---

## 7) Utility Layer

### `validators.ts`
File: `src/utils/validators.ts`

Contains validation helpers:
- `isRequired(value)`
- `isValidYear(yearStr)`
- `isNumericId(id)`
- `isValidEmail(email)`

These helpers are reused by forms and ensure data integrity.

### `idGenerator.ts`
File: `src/utils/idGenerator.ts`

Generates numeric IDs using current timestamp + random value:
```ts
export function generateNumericId(): string {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}
```

---

## 8) Type Definitions

File: `src/types/index.ts`

Contains shared types:
- `ModalSize` = `'sm' | 'md' | 'lg'`
- `ModalAction`
- `ModalConfig`

This keeps modal configuration centralized and reusable.

---

## 9) Implementation Details and App Logic

### Borrow flow
1. User clicks the borrow button on a book.
2. `handleBorrow(bookId)` finds the selected book.
3. `NotificationService.showBorrowPrompt(...)` opens a modal.
4. User enters a user ID.
5. The app checks:
   - whether the user exists
   - whether the user already has 3 borrowed books
6. If valid:
   - `book.isBorrowed = true`
   - `book.borrowedByUserId = user.id`
   - user adds the book ID to `borrowedBookIds`
   - state is saved to localStorage
   - UI re-renders

### Return flow
1. App finds the book by ID.
2. If borrowed, it removes the book from the user list.
3. Clears borrow status and user reference.
4. Persists data and re-renders.

### Delete user flow
- A user cannot be deleted if they still have active borrowed books.
- This protects business rules.

### Delete book flow
- If the book is currently borrowed, it removes the book from the user’s borrowed list before deletion.

### Search and pagination
- `searchTerm` filters books by title + author
- `currentPage` tracks the active page
- `pageSize = 5`
- total pages calculated using `Math.ceil(filteredBooks.length / pageSize)`

---

## 10) Testing

Files:
- `tests/library.test.ts`
- `tests/validation.test.ts`

Covered areas:
- adding/removing/finding items in `Library`
- validation of year, email, ID, required strings

Command:
```bash
npm test
```

---

## 11) Vite vs Webpack Comparison

| Feature | Vite | Webpack |
|---|---|---|
| Primary purpose | Frontend development server and bundler | General-purpose module bundler |
| Speed | Very fast startup and HMR | Slower startup and rebuild with large configs |
| Development experience | Very smooth DX, instant server startup | More complex configuration |
| Configuration | Simpler and modern | More verbose and config-heavy |
| Build performance | Optimized for modern frontend workflows | Good for large custom setups |
| Ecosystem | Great for Vue/React/TypeScript SPA projects | Mature; powerful for complex apps |
| Best for | Modern frontend projects, Vite apps, small/medium apps | Large enterprise builds, custom pipelines |
| Learning curve | Easier for small-to-medium apps | Steeper due to config complexity |
| HMR | Excellent | Good, but slower in bigger projects |

### Why this project uses Vite
- It is simpler to configure
- It works well for a TypeScript frontend app
- It is fast during development
- It matches the project’s lightweight architecture

---

## 12) Recommended Architecture Summary

This app follows a simple layered structure:

```text
UI Layer (components + render)
    ↓
Service Layer (Library + Storage + Notification)
    ↓
Model Layer (Book, User, interfaces)
    ↓
Validation / Utilities
```

This structure is easy to maintain and suitable for a small library app.

---

## 13) Useful Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm test
```

---

## 14) Final Takeaway
This project is a clean example of a TypeScript app built without a framework, using:
- a domain model layer
- a reusable collection service
- browser storage for persistence
- component-like UI rendering functions
- validation utilities
- a simple event-driven architecture

It is a good reference for understanding how a small front-end project can be organized in a structured and maintainable way.
