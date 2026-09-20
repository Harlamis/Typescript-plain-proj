import { Validation } from '../../utils/validators';

export class UserForm {
  public static render(): string {
    return `
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Додати Користувача</h2>
        <form id="user-form" class="space-y-4">
          <div>
            <input name="name" type="text" placeholder="Ім'я" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Це поле є обов'язковим</p>
          </div>
          <div>
            <input name="email" type="email" placeholder="Email" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Некоректний email</p>
          </div>
          <button type="submit" class="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">Додати Користувача</button>
        </form>
      </div>
    `;
  }

  public static validate(form: HTMLFormElement): Partial<Record<'name' | 'email', string>> {
    const formData = new FormData(form);
    const values = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
    };

    const errors: Partial<Record<'name' | 'email', string>> = {};

    if (!Validation.isRequired(values.name)) {
      errors.name = "Це поле є обов'язковим";
    }

    if (!Validation.isValidEmail(values.email)) {
      errors.email = 'Некоректний email';
    }

    return errors;
  }
}
