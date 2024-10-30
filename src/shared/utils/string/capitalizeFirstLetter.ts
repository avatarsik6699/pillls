export function capitalizeFirstLetter(input: string) {
  // Проверяем, что строка не пустая
  if (input.length === 0) {
    return input;
  }

  // Получаем первый символ и преобразуем его в верхний регистр
  const firstChar = input.charAt(0).toUpperCase();

  // Получаем оставшуюся часть строки, начиная со второго символа
  const restOfString = input.slice(1);

  // Объединяем первый символ в верхнем регистре с оставшейся частью строки
  return firstChar + restOfString;
}
