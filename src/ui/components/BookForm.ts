import { Validation } from '../../utils/validators';

export interface BookFormValues {
  title: string;
  author: string;
  year: string;
}

export class BookForm {
  public static render(): string {
    return `
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Додати Книгу</h2>
        <form id="book-form" class="space-y-4">
          <div>
            <input name="title" type="text" placeholder="Назва книги" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Це поле є обов'язковим</p>
          </div>
          <div>
            <input name="author" type="text" placeholder="Автор" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Це поле є обов'язковим</p>
          </div>
          <div>
            <input name="year" type="text" placeholder="Рік видання" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Рік має бути 4-значним числом</p>
          </div>
          <button type="submit" class="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">Додати Книгу</button>
        </form>
      </div>
    `;
  }

  public static validate(form: HTMLFormElement): Partial<Record<keyof BookFormValues, string>> {
    const formData = new FormData(form);
    const values = {
      title: String(formData.get('title') ?? ''),
      author: String(formData.get('author') ?? ''),
      year: String(formData.get('year') ?? ''),
    };

    const errors: Partial<Record<keyof BookFormValues, string>> = {};

    if (!Validation.isRequired(values.title)) {
      errors.title = "Це поле є обов'язковим";
    }

    if (!Validation.isRequired(values.author)) {
      errors.author = "Це поле є обов'язковим";
    }

    if (!Validation.isValidYear(values.year)) {
      errors.year = 'Рік має бути 4-значним числом';
    }

    return errors;
  }
}
