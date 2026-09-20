import { IBook } from '../../models/interfaces/IBook';

export class BookList {
  public static render(
    books: IBook[],
    currentPage: number,
    totalPages: number,
    searchTerm: string,
  ): string {
    const rows = books.length
      ? books
          .map(
            (book) => `
              <div class="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                <span class="text-base text-gray-800">${book.title} by ${book.author} (${book.year})</span>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="${book.isBorrowed ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'} rounded px-4 py-1.5 text-sm text-white"
                    data-action="${book.isBorrowed ? 'return' : 'borrow'}"
                    data-book-id="${book.id}"
                  >
                    ${book.isBorrowed ? 'Повернути' : 'Позичити'}
                  </button>
                  <button type="button" class="rounded bg-red-600 px-2 py-1 text-sm text-white" data-action="delete-book" data-book-id="${book.id}">✕</button>
                </div>
              </div>
            `,
          )
          .join('')
      : '<p class="py-3 text-gray-500">Немає книг.</p>';

    const pageButtons = Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      const isActive = pageNumber === currentPage;
      return `
        <button
          type="button"
          data-page="${pageNumber}"
          class="min-w-9 rounded border px-2 py-1 text-sm ${
            isActive
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
          }"
        >
          ${pageNumber}
        </button>
      `;
    }).join('');

    return `
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Список Книг</h2>
        <div class="mb-4">
          <input
            type="search"
            value="${searchTerm}"
            data-role="book-search"
            placeholder="Пошук за назвою або автором"
            class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div class="space-y-0">${rows}</div>
        ${
          totalPages > 1
            ? `
          <div class="mt-4 flex items-center justify-between gap-3 pt-4">
            <button type="button" data-page="prev" class="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}">Назад</button>
            <div class="flex flex-wrap items-center gap-2">${pageButtons}</div>
            <button type="button" data-page="next" class="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}">Вперед</button>
          </div>
        `
            : ''
        }
      </div>
    `;
  }
}
