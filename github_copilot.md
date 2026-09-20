# ТЕХНІЧНЕ ЗАВДАННЯ ТА ІНСТРУКЦІЯ ДЛЯ COPILOT (VS CODE)

> **Призначення:** Цей документ разом зі скріншотами (`ui-state-0.jpg` — `ui-modal-returned.jpg`) є повним технічним завданням для автономної та покрокової розробки SPA-застосунку для управління бібліотекою.

---

## 1. РОЛЬ ТА ПРАВИЛА РОБОТИ COPILOT

Ти виступаєш у ролі **Senior TypeScript Frontend Architect**. Твоє завдання — згенерувати повноцінний, виробничий, строго типізований код без "милиць" та спрощень.

### Суворі обмеження проєкту:
1. **ЖОДНИХ UI-ФРЕЙМВОРКІВ:** Категорично заборонено використовувати React, Vue, Angular, Svelte тощо.
2. **ЧИСТИЙ DOM API:** У файлі `index.html` дозволено мати **виключно** `<div id="app"></div>`. Уся розмітка, картки, кнопки, списки, форми, модальні вікна та валідація генеруються та оновлюються **програмно через TypeScript** (DOM API / typed render-функції).
3. **СТИЛІЗАЦІЯ:** Tailwind CSS, зібраний локально через Webpack (PostCSS + Autoprefixer). Жодних CDN-посилань у HTML.
4. **ОБОВ'ЯЗКОВІ TS-КОНЦЕПЦІЇ:**
   - Інтерфейси (`IBook`, `IUser`) та класи (`Book`, `User`).
   - Generics: універсальний клас сховища/колекції `Library<T>`.
   - Namespaces: `namespace Validation { ... }` для валідаторів.
   - Модульна ES-архітектура (imports/exports).
5. **ЗАБОРОНА BROWSER POPUPS:** Використання нативних `alert()`, `confirm()`, `prompt()` **суворо заборонено**. Усі сповіщення та діалоги позичання — це власні модальні вікна на Tailwind CSS.
6. **ЗБЕРЕЖЕННЯ СТАНУ:** Усі дані (книги, користувачі, статус позичання) повинні синхронізуватися з `LocalStorage`. При оновленні сторінки стан не втрачається.
7. **ТЕСТУВАННЯ ТА ЯКІСТЬ:** Повне покриття `Library<T>` та `Validation` юніт-тестами на Mocha + Chai. Налаштовані ESLint, Prettier та Husky pre-commit hook.

---

## 2. АРХІТЕКТУРА ПРОЄКТУ

Дотримуйся наступної структури директорій:

```text
lab-library-app/
├── .husky/
│   └── pre-commit
├── src/
│   ├── models/
│   │   ├── interfaces/
│   │   │   ├── IBook.ts
│   │   │   └── IUser.ts
│   │   ├── Book.ts
│   │   └── User.ts
│   ├── services/
│   │   ├── Library.ts               # Generic-клас Library<T>
│   │   ├── Storage.ts               # LocalStorage обгортка
│   │   └── NotificationService.ts   # Керування модалками / тостами
│   ├── utils/
│   │   ├── validators.ts            # namespace Validation
│   │   └── idGenerator.ts
│   ├── ui/
│   │   ├── components/
│   │   │   ├── BookForm.ts
│   │   │   ├── BookList.ts
│   │   │   ├── UserForm.ts
│   │   │   ├── UserList.ts
│   │   │   ├── Pagination.ts
│   │   │   └── Modal.ts
│   │   └── render.ts                # Ініціалізація DOM, оркестрація
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── main.css                 # @tailwind directives + власні правки
│   └── index.ts                     # Точка входу
├── tests/
│   ├── library.test.ts
│   └── validation.test.ts
├── public/
│   └── favicon.ico
├── index.html                       # Лише <div id="app"></div>
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── webpack.config.js
└── package.json
```

---

## 3. ДЕТАЛЬНИЙ ОПИС ЕКРАНІВ ТА ДИЗАЙНУ (ВІДПОВІДНО ДО СКРІНШОТІВ)

### Загальний стиль сторінки:
- Фон сторінки: світло-сірий (`bg-gray-100 min-h-screen py-8 px-4 font-sans`).
- Заголовок сторінки по центру: **"Система Управління Бібліотекою"** (`text-2xl md:text-3xl font-bold text-center text-black mb-8`).
- Центрований контейнер карток: `max-w-4xl mx-auto space-y-6`.
- Кожна картка секції: білий блок з тінню та заокругленнями (`bg-white rounded-lg shadow-sm border border-gray-200 p-6`).

### Секція 1: "Додати Книгу" (`ui-state-0.jpg`, `ui-form-validation.jpg`)
- Заголовок: `text-xl font-bold text-black mb-4` ("Додати Книгу").
- Інпути (один під одним, `space-y-4`):
  1. `Назва книги` (placeholder: "Назва книги")
  2. `Автор` (placeholder: "Автор")
  3. `Рік видання` (placeholder: "Рік видання")
- Стиль полів вводу: `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800`.
- Повідомлення про помилку: червоний текст `text-red-600 text-xs mt-1` ("Це поле є обов'язковим" або "Рік має бути 4-значним числом").
- Кнопка: зелена (`bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded transition-colors text-sm`), текст: **"Додати Книгу"**.

### Секція 2: "Додати Користувача"
- Заголовок: `text-xl font-bold text-black mb-4` ("Додати Користувача").
- Інпути:
  1. `Ім'я` (placeholder: "Ім'я")
  2. `Email` (placeholder: "Email")
- Кнопка: зелена (`bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded text-sm`), текст: **"Додати Користувача"**.

### Секція 3: "Список Книг" (`ui-state-1.jpg`, `ui-state-2.jpg`)
- Заголовок: `text-xl font-bold text-black mb-4` ("Список Книг").
- Додаткові контролери (за ТЗ):
  - Поле пошуку за назвою або автором (`input[type="search"]`).
  - Пагінація: відображати по 5 елементів на сторінку (якщо записів багато) з кнопками "Назад", "Вперед" та номерами сторінок.
- Елемент списку: горизонтальний рядок із нижнім розділювачем (`flex items-center justify-between py-3 border-b border-gray-200 last:border-0`).
- Формат тексту книги: `{Title} by {Author} ({Year})`.
- Дії для кожної книги:
  - Якщо книга **доступна**: синя кнопка (`bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded`), текст: **"Позичити"**.
  - Якщо книга **позичена**: жовто-помаранчева кнопка (`bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-1.5 rounded`), текст: **"Повернути"**.
  - Кнопка видалення книги (іконка або червоний хрестик/кнопка).

### Секція 4: "Список Користувачів"
- Заголовок: `text-xl font-bold text-black mb-4` ("Список Користувачів").
- Елемент списку: рядок із нижнім розділювачем (`py-3 border-b border-gray-200 last:border-0 flex justify-between items-center`).
- Формат тексту: `{id} {name} ({email})` (наприклад, `1725533394038 Артем (artemkarachevstev@gmail.com)`).
- Кнопка видалення користувача (видаляти можна тільки тих, у кого немає не повернутих книг).

### Секція 5: Модальні вікна (Modal System)
Оверлей: фіксований шар на весь екран (`fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4`).  
Вікно: білий прямокутник із заокругленими кутами (`bg-white rounded-md shadow-xl max-w-md w-full p-6 relative border border-gray-200`).

1. **Модалка вибору користувача при позичанні (`ui-modal.jpg`):**
   - Заголовок: `text-lg font-semibold text-gray-900` ("Введіть ID користувача для позичення книги:").
   - Хрестик закриття у правому верхньому куті (`text-gray-400 hover:text-gray-600`).
   - Поле вводу: `ID` (тільки цифри, валідація на існування користувача).
   - Кнопки знизу праворуч (`flex justify-end space-x-2 mt-4`):
     - Сіра кнопка: **"Скасувати"** (`bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm`).
     - Синя кнопка: **"Зберегти"** (`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm`).
2. **Модалка підтвердження позичання (`ui-modal-complete.jpg`):**
   - Текст повідомлення: `{Title} by {Author} ({Year}) has been borrowed by {id} {name} ({email}).`
   - Кнопка знизу праворуч: **"Зрозуміло!"** (`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm`).
3. **Модалка підтвердження повернення (`ui-modal-returned.jpg`):**
   - Текст повідомлення: `{Title} by {Author} ({Year}) has been returned.`
   - Кнопка знизу праворуч: **"Закрити"** (`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm`).
4. **Модалка ліміту (Обмеження 3 книги):**
   - Текст: "Користувач {name} вже позичив 3 книги! Максимальний ліміт вичерпано."
   - Кнопка: "Зрозуміло!".

---

## 4. ВИМОГИ ДО КОДУ ТА ТИПІЗАЦІЇ

### 1. Моделі та Інтерфейси:
```typescript
// src/models/interfaces/IBook.ts
export interface IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
  borrowedByUserId?: string | null;
}

// src/models/interfaces/IUser.ts
export interface IUser {
  id: string; // тільки цифри (числовий рядок / timestamp)
  name: string;
  email: string;
  borrowedBookIds: string[];
}
```
- Класи `Book` та `User` мають реалізовувати відповідні інтерфейси, містити інкапсульовані поля та гетери/сетери для доступу й мутацій.

### 2. Generics у `Library<T>`:
```typescript
// src/services/Library.ts
export interface IIdentifiable {
  id: string;
}

export class Library<T extends IIdentifiable> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) { ... }
  public add(item: T): void { ... }
  public remove(id: string): boolean { ... }
  public find(id: string): T | undefined { ... }
  public getAll(): T[] { ... }
  public filter(predicate: (item: T) => boolean): T[] { ... }
}
```

### 3. Namespace `Validation`:
```typescript
// src/utils/validators.ts
export namespace Validation {
  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  export function isValidYear(yearStr: string): boolean {
    // Тільки 4 цифри, в межах від 800 до поточного року
    const regex = /^(1[0-9]{3}|20[0-2][0-9])$/;
    if (!regex.test(yearStr.trim())) return false;
    const year = parseInt(yearStr, 10);
    return year <= new Date().getFullYear();
  }

  export function isNumericId(id: string): boolean {
    return /^\d+$/.test(id.trim());
  }

  export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
}
```

### 4. Бізнес-правила позичання (Borrow/Return Service):
- При позичанні:
  1. Перевірити, чи існує користувач із введеним числовим `ID`. Якщо ні — вивести помилку в модалці.
  2. Перевірити, чи не перевищує кількість позичених книг користувача ліміт `3`. Якщо `borrowedBookIds.length >= 3` — заблокувати дію та відкрити інформаційне модальне вікно.
  3. Якщо все добре: перевести `book.isBorrowed = true`, `book.borrowedByUserId = user.id`, додати `book.id` у `user.borrowedBookIds`.
  4. Зберегти оновлені колекції в `LocalStorage`.
  5. Перерендерити UI та показати модалку успіху (`ui-modal-complete.jpg`).
- При поверненні:
  1. Знайти користувача, який утримує книгу, видалити `book.id` з його `borrowedBookIds`.
  2. Встановити `book.isBorrowed = false`, `book.borrowedByUserId = null`.
  3. Зберегти в `LocalStorage`.
  4. Перерендерити UI та показати модалку повернення (`ui-modal-returned.jpg`).

---

## 5. КОНФІГУРАЦІЯ СТЕКУ ТА ІНСТРУМЕНТІВ

### `package.json` залежності:
- **Dependencies:** жодних фронтенд-фреймворків!
- **DevDependencies:**
  - `typescript`, `ts-loader`, `webpack`, `webpack-cli`, `webpack-dev-server`, `html-webpack-plugin`
  - `tailwindcss`, `postcss`, `postcss-loader`, `autoprefixer`, `css-loader`, `style-loader`, `mini-css-extract-plugin`
  - `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `prettier`, `eslint-config-prettier`
  - `mocha`, `chai`, `ts-node`, `@types/mocha`, `@types/chai`, `@types/node`
  - `husky`

### Налаштування Webpack (`webpack.config.js`):
- `entry`: `./src/index.ts`
- `output`: `dist/`, `bundle.[contenthash].js`, `clean: true`
- `resolve`: extensions: `['.ts', '.js']`
- `module.rules`:
  - `/\.ts$/` -> `ts-loader`
  - `/\.css$/` -> `style-loader` (або `MiniCssExtractPlugin.loader`), `css-loader`, `postcss-loader`
- `devServer`: порт `9000`, гаряче перезавантаження (hot: true), open: true.

### Юніт-тести (`tests/`):
- `tests/library.test.ts`: перевірка generic-методів `Library<T>` (додавання, пошук за id, фільтрація, видалення, робота з різними типами даних).
- `tests/validation.test.ts`: перевірка всіх функцій з `Validation` (порожні рядки, коректні/некоректні роки типу "abc", "2500", "1999", перевірка числових ID та валідних email).

---

## 6. ПОКРОКОВИЙ ПЛАН ВИКОНАННЯ ДЛЯ COPILOT

Виконуй завдання поетапно. На кожному етапі створюй відповідні файли згідно зі структурою:

- [ ] **Крок 1:** Створити файли конфігурації: `package.json`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `webpack.config.js`, `.eslintrc.json`, `.prettierrc`, `index.html`.
- [ ] **Крок 2:** Реалізувати моделі та інтерфейси: `IBook.ts`, `IUser.ts`, `Book.ts`, `User.ts`.
- [ ] **Крок 3:** Реалізувати утиліти та валідатори: `validators.ts` (із `namespace Validation`) та `idGenerator.ts`.
- [ ] **Крок 4:** Реалізувати сервіси: `Storage.ts`, generic `Library.ts`, `NotificationService.ts`.
- [ ] **Крок 5:** Написати тести на Mocha + Chai для `Library` та `Validation`.
- [ ] **Крок 6:** Створити UI-компоненти (чистий DOM API з Tailwind класами): `Modal.ts`, `BookForm.ts`, `UserForm.ts`, `BookList.ts`, `UserList.ts`, `Pagination.ts`.
- [ ] **Крок 7:** Створити `render.ts` та `index.ts` — зібрати весь застосунок докупи, зв'язати події з `LocalStorage`.
- [ ] **Крок 8:** Додати інструкцію для міграції на **Vite** в окремій гілці `vite-migration` та шаблон аналітичного звіту для README.