export namespace Validation {
  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  export function isValidYear(yearStr: string): boolean {
    const trimmed = yearStr.trim();
    const regex = /^\d{4}$/;

    if (!regex.test(trimmed)) {
      return false;
    }

    const year = Number(trimmed);
    const currentYear = new Date().getFullYear();

    return year >= 800 && year <= currentYear;
  }

  export function isNumericId(id: string): boolean {
    return /^\d+$/.test(id.trim());
  }

  export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
}
