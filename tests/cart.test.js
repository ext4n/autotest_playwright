// Импортируем две главные части из библиотеки Playwright:
// 1. 'test' - это функция, которая определяет сам тест (наш сценарий).
// 2. 'expect' - это функция для проверок (чтобы убедиться, что всё работает, как мы ожидаем).
import { test, expect } from '@playwright/test';

// Оборачиваем весь наш сценарий в функцию 'test'.
// Даём ему имя 'Test_basket_with_additional_checks_fixed'.
// 'async ({ page })' означает, что тест будет асинхронным (будет ждать выполнения команд)
// и что Playwright должен предоставить нам "страницу" ('page') — это наш виртуальный браузер.
test('Test_basket_with_additional_checks_fixed', async ({ page }) => {

  // ===== Функция логирования прямо на странице =====
  // Это мы создаём свою собственную вспомогательную функцию 'logOnPage'.
  // Она нужна, чтобы выводить сообщения о ходе теста прямо в углу браузера,
  // который видит Playwright. Это очень удобно для отладки.
  const logOnPage = async (message) => {
    // 'page.evaluate' выполняет JavaScript-код прямо внутри страницы в браузере.
    await page.evaluate((msg) => {
      // Ищем на странице элемент с ID 'test-log'.
      let logContainer = document.getElementById('test-log');
      // Если такого элемента нет (первый запуск)...
      if (!logContainer) {
        // ...то мы его создаём. Это будет обычный 'div'.
        logContainer = document.createElement('div');
        logContainer.id = 'test-log';
        // Применяем стили, чтобы он выглядел как чёрный полупрозрачный
        // прямоугольник в правом нижнем углу.
        logContainer.style.position = 'fixed';
        logContainer.style.bottom = '10px';
        logContainer.style.right = '10px';
        logContainer.style.background = 'rgba(0,0,0,0.7)';
        logContainer.style.color = 'white';
        logContainer.style.padding = '10px';
        logContainer.style.zIndex = 9999; // Поверх всех
        logContainer.style.maxWidth = '300px';
        logContainer.style.fontSize = '14px';
        logContainer.style.fontFamily = 'sans-serif';
        logContainer.style.borderRadius = '5px';
        logContainer.style.pointerEvents = 'none'; // Не мешает кликать "под" ним
        logContainer.style.overflowY = 'auto';
        logContainer.style.maxHeight = '90vh';
        // Добавляем наш созданный 'div' на страницу.
        document.body.appendChild(logContainer);
      }
      // Добавляем наше новое сообщение в лог (с новой строки).
      logContainer.innerHTML += msg + '<br>';
    }, message); // 'message' передаётся внутрь 'page.evaluate' как аргумент 'msg'
  };

  //== Шаг 1: Открываем сайт
  // Команда 'page.goto' приказывает браузеру перейти по указанному URL.
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  // Используем нашу функцию, чтобы написать в лог на странице, что мы сделали.
  await logOnPage('Открыли магазин Rahul Shetty Academy');
  // 'waitForTimeout' — это простая пауза. Ждём 1 секунду (1000 мс),
  // чтобы страница успела прогрузиться и мы визуально увидели, что происходит.
  await page.waitForTimeout(1000);

  //== Шаг 2: Ждём поле поиска
  // 'page.waitForSelector' — очень важная команда. Она ждёт, пока на странице
  // не появится элемент, соответствующий селектору '.search-keyword'.
  // Мы даём ему 10 секунд (10000 мс). Если не появится, тест упадёт.
  await page.waitForSelector('.search-keyword', { timeout: 10000 });
  // Сообщаем, что поле поиска готово.
  await logOnPage('Поле поиска готово');
  await page.waitForTimeout(500); // Короткая пауза в полсекунды

  //== Шаг 3: Вводим "ro"
  // 'page.locator' находит элемент на странице (но пока не взаимодействует с ним).
  // Мы "прицеливаемся" к полю поиска и сохраняем этот "прицел" в переменную.
  const searchBox = page.locator('.search-keyword');
  // 'fill' — это команда "заполнить". Она мгновенно вставляет текст "ro" в поле.
  await searchBox.fill('ro');
  await logOnPage('Ввели "ro" в поиск');
  await page.waitForTimeout(1000); // Ждём секунду, чтобы увидеть отфильтрованные товары

  //== Шаг 4: Carrot = 5
  // Ищем локатор для целого блока продукта "Carrot".
  // Селектор ':has-text("Carrot")' означает: найди элемент с классом '.product',
  // внутри которого есть текст "Carrot".
  const carrot = page.locator('.product:has-text("Carrot")');
  // Теперь ищем поле для ввода количества, но уже ВНУТРИ найденного блока 'carrot'.
  const carrotInput = carrot.locator('input.quantity');
  // Заполняем это поле значением "5".
  await carrotInput.fill('5');
  await logOnPage('Carrot выбрали и установили 5 штук');
  await page.waitForTimeout(300);

  //== Шаг 5: Mushroom = 3
  // Аналогично находим блок продукта "Mushroom".
  const mushroom = page.locator('.product:has-text("Mushroom")');
  // Внутри него находим кнопку "плюс" (с классом '.increment').
  const incrementButton = mushroom.locator('.increment');
  // Запускаем цикл, который повторится 2 раза (для i = 0 и i = 1).
  for (let i = 0; i < 2; i++) {
    // Кликаем на кнопку "плюс".
    await incrementButton.click();
    // Делаем крошечную паузу, чтобы клики не были слишком быстрыми.
    await page.waitForTimeout(200);
  }
  // Так как по умолчанию там уже стоит "1", мы кликнули "плюс" 2 раза
  // и в итоге получили 1 + 2 = 3.
  await logOnPage('Mushroom выбрали и установили 3 штуки');

  //== Шаг 6 и 7: Добавляем товары в корзину
  // Находим кнопку "ADD TO CART" внутри блока 'carrot' и кликаем.
  await carrot.locator('text=ADD TO CART').click();
  // Находим кнопку "ADD TO CART" внутри блока 'mushroom' и кликаем.
  await mushroom.locator('text=ADD TO CART').click();
  await logOnPage('Добавили Carrot и Mushroom в корзину');
  await page.waitForTimeout(500);

  //== Шаг 8: Открываем корзину (клик вместо hover)
  // Находим иконку корзины по её 'alt' атрибуту.
  const cartIcon = page.locator('img[alt="Cart"]');
  // Кликаем на неё, чтобы открыть выпадающее меню корзины.
  await cartIcon.click();
  // Находим блок со списком товаров, но только ВНУТРИ активной (открытой) корзины.
  // Селектор '.cart-preview.active' означает, что у блока должен быть
  // и класс 'cart-preview', и класс 'active'.
  const activeCart = page.locator('.cart-preview.active .cart-items');
  // Ждём, пока этот блок не станет видимым (state: 'visible').
  await activeCart.waitFor({ state: 'visible', timeout: 5000 });
  await logOnPage('Открыли корзину');
  await page.waitForTimeout(500);

  //== Шаг 9: Проверяем наличие товаров
  // 'expect(activeCart)' - начинаем проверку.
  // '.toContainText('Carrot')' - мы ожидаем, что внутри блока 'activeCart'
  // где-то есть текст "Carrot".
  await expect(activeCart).toContainText('Carrot');
  // То же самое для "Mushroom".
  await expect(activeCart).toContainText('Mushroom');
  await logOnPage('Проверка: Carrot и Mushroom в корзине');

  //== Шаг 10: Проверяем корректность количества
  // 'inputValue()' — это команда "получить текущее значение из поля ввода".
  // Мы берём значение из поля 'carrotInput' (которое мы нашли в Шаге 4).
  const carrotQuantity = await carrotInput.inputValue();
  // Для грибов мы находим поле заново и берём его значение.
  const mushroomQuantity = await mushroom.locator('input.quantity').inputValue();
  
  // 'toBe('5')' — это строгая проверка. Мы ожидаем, что значение
  // (которое всегда является текстом/строкой) в точности равно "5".
  await expect(carrotQuantity).toBe('5');
  await expect(mushroomQuantity).toBe('3');
  await logOnPage(`Проверка количества: Carrot=${carrotQuantity}, Mushroom=${mushroomQuantity}`);

  //== Шаг 11: Проверка цен
  // 'textContent()' — команда "получить весь текст внутри элемента".
  // Находим элемент с ценой внутри блока 'carrot' и забираем его текст.
  const carrotPrice = await carrot.locator('.product-price').textContent();
  // То же самое для грибов.
  const mushroomPrice = await mushroom.locator('.product-price').textContent();
  // Просто выводим цены в лог. Мы их не проверяем (нет 'expect').
  await logOnPage(`Проверка цены: Carrot=${carrotPrice}, Mushroom=${mushroomPrice}`);

  //== Шаг 12: Удаляем Carrot
  // Ищем конкретный элемент списка 'li' в корзине, в котором есть текст "Carrot".
  const carrotItem = page.locator('.cart-preview.active .cart-items li:has-text("Carrot")');
  // Ждём, пока этот 'li' (строка с морковкой) не станет видимым.
  await carrotItem.waitFor({ state: 'visible', timeout: 5000 });
  // Внутри этой строки 'li' ищем крестик для удаления (класс '.product-remove').
  const removeButton = carrotItem.locator('.product-remove');
  // Кликаем на крестик. '{ force: true }' — это "силовой" клик. Он используется
  // на случай, если элемент чем-то перекрыт, но мы уверены, что хотим нажать.
  await removeButton.click({ force: true });
  await logOnPage('Удалили Carrot из корзины');
  // Ждём 1.5 секунды, чтобы анимация удаления завершилась и корзина обновилась.
  await page.waitForTimeout(1500);

  //== Шаг 13: Проверяем, что остался только Mushroom
  // Снова проверяем, что "Mushroom" всё ещё в корзине.
  await expect(activeCart).toContainText('Mushroom');
  // А вот "Carrot", как мы и ожидаем (.not), больше НЕ должно быть в корзине.
  await expect(activeCart).not.toContainText('Carrot');
  await logOnPage('Проверка: остался только Mushroom');

  //== Шаг 14: Доп. тест — поиск "mu" показывает Mushroom
  // Снова используем поле поиска, но теперь вводим "mush".
  await searchBox.fill('mush');
  await page.waitForTimeout(1000); // Ждём фильтрации
  // Находим блок "Mushroom" на главной странице.
  const mushroomVisible = page.locator('.product:has-text("Mushroom")');
  // Проверяем, что он видим ('.toBeVisible()'). Это доказывает, что поиск работает.
  await expect(mushroomVisible).toBeVisible();
  await logOnPage('Доп. проверка: поиск "mush" показывает Mushroom');

  //== Шаг 15: Доп. тест — кнопка ADD TO CART доступна
  // В блоке 'mushroom' находим кнопку "ADD TO CART".
  const addToCartButton = mushroom.locator('text=ADD TO CART');
  // Проверяем, что она всё ещё видима.
  await expect(addToCartButton).toBeVisible();
  await logOnPage('Доп. проверка: кнопка ADD TO CART доступна для Mushroom');

  //== Финальная пауза
  // Ждём 4 секунды в конце, чтобы просто посмотреть на финальное состояние
  // страницы и лога перед тем, как браузер закроется.
  await page.waitForTimeout(4000);
  await logOnPage('Тест завершён, все проверки прошли');

}); // Конец теста