export function formatPrice(value: number | null) {
  if (value === null) return "Цена не указана"

  return `${value.toLocaleString("ru-RU").replace(/\u00a0/g, " ")} ₽`
}
