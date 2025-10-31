# Автоматизированное тестирование сайта Rahul Shetty Academy

Проект содержит автоматизированные тесты для сайта [Rahul Shetty Academy](https://rahulshettyacademy.com/seleniumPractise/#/) с использованием **Playwright** и **JavaScript**. 

Тесты проверяют: поиск товаров через поле поиска, выбор товара **Carrot** количеством 5 через поле ввода, выбор товара **Mushroom** количеством 3 через кнопки увеличения, добавление товаров в корзину, открытие корзины и проверку добавленных товаров, удаление **Carrot** из корзины и проверку оставшихся товаров, а также дополнительные проверки поиска товара и доступности кнопки `ADD TO CART`. 

Все действия логируются прямо на странице через функцию `logOnPage`, чтобы удобно отслеживать ход теста.

Для запуска проекта необходимо иметь **Node.js версии 18+**, **npm** и **Git**. 

Сначала клонируем репозиторий и переходим в папку проекта одной командой: 
`git clone https://github.com/ext4n/autotest_playwright.git && cd autotest_playwright`. 

Если в проекте отсутствует файл `package.json`, создаём его: 
`npm init -y`

Устанавливаем Playwright: 
`npm install -D @playwright/test` 

Затем скачиваем все необходимые браузеры и инструменты: 
`npx playwright install`
(Chromium, Firefox, Webkit, FFMPEG и Winldd).

Проверяем корректность установки: 
`npx playwright test`.

Для запуска тестов используем 
`npx playwright test`, 

для запуска конкретного файла теста
`npx playwright test tests/test_basket.spec.js`

Для визуального запуска тестов в браузере: 
`npx playwright test --headed`

После завершения тестов можно открыть HTML-отчёт командой 
`npx playwright show-report`

Полный процесс установки и запуска на другой машине можно выполнить одной строкой: 
`git clone https://github.com/ext4n/autotest_playwright.git && cd autotest_playwright && npm init -y && npm install -D @playwright/test && npx playwright install && npx playwright test`.

Структура проекта: папка 
`tests`
содержит файл `test_basket.spec.js` с основным тестом 

в корне проекта находятся файлы 
`package.json`, `package-lock.json` и `README.md`

Для отладки тестов удобно использовать 
`page.pause()`

а логирование действий осуществляется через функцию 
`logOnPage`

По вопросам работы с проектом обращайтесь к автору репозитория или создавайте issues на GitHub.
