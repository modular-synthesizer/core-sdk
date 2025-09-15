export function indexOn<T>(array: T[], field: keyof T): Record<string, T> {
  return Object.fromEntries(array.map(i => [i[field], i]))
}