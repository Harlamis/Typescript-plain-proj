import { IUser } from '../../models/interfaces/IUser';

export class UserList {
  public static render(users: IUser[]): string {
    if (!users.length) {
      return `
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-xl font-bold text-black">Список Користувачів</h2>
          <p class="text-gray-500">Немає користувачів.</p>
        </div>
      `;
    }

    return `
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Список Користувачів</h2>
        <div class="space-y-0">
          ${users
            .map(
              (user) => `
                <div class="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                  <span class="text-base text-gray-800">${user.id} ${user.name} (${user.email})</span>
                  <button type="button" class="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700" data-action="delete-user" data-user-id="${user.id}">✕</button>
                </div>
              `,
            )
            .join('')}
        </div>
      </div>
    `;
  }
}
