import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
  }).format(price);
  const formattedWithDot = formatted.replace(/,/g, '.').replace('PYG', 'Gs');
  return formattedWithDot;
}

export function capitalizeFirstLetter(string: string | undefined | null) {
  if (string === null || string === undefined) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function computeSHA256(file: File) {
  if (!(file instanceof File)) {
    throw new Error('Provided argument is not a File object.');
  }
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
