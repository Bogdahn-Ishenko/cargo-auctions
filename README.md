# Грузовые аукционы SPA

SPA для работы с грузовыми аукционами. Backend для тестового задания не требуется: HTTP-контракт эмулируется через MSW по OpenAPI-схеме из `src/shared/api/openapi.json`.

## Ссылки

- Production: [https://cargo-auctions.vercel.app/](https://cargo-auctions.vercel.app/)
- GitHub: [https://github.com/Bogdahn-Ishenko/cargo-auctions/tree/main](https://github.com/Bogdahn-Ishenko/cargo-auctions/tree/main)

## Стек

- React 18, TypeScript, Vite
- TanStack Router, TanStack Query
- Zod, React Hook Form, Zustand
- MSW 2
- shadcn/ui, Radix UI, Tailwind CSS
- Leaflet, React Leaflet
- Vitest, ESLint, Husky, commitlint

## Запуск

```bash
pnpm install
pnpm dev
```

Приложение откроется на `http://localhost:5173`.

Пример страницы со списком:

```text
http://localhost:5173/?page=1&per_page=6&sort=stop_time_asc&auc_type=all&status=all
```

## Проверка

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```

Полный набор перед отправкой изменений:

```bash
pnpm check:pre-commit
pnpm check:pre-push
```

Git hooks:

- `pre-commit`: `pnpm check:pre-commit`
- `pre-push`: `pnpm check:pre-push`
- `commit-msg`: проверка Conventional Commits

## Сценарии проверки

Я проверял результат через локальный запуск, production build и production deploy на Vercel.

Ручные сценарии:

- открыл список аукционов и проверил загрузку данных из MSW;
- проверил пагинацию, смену размера страницы и сохранение footer при переходах между страницами;
- проверил фильтры списка: номер заявки, тип аукциона, multi-value `statuses`, города, даты, цену, цену за км, вес, дистанцию и checkbox-фильтры;
- проверил синхронизацию фильтров, сортировки и пагинации с URL search params;
- проверил empty, loading skeleton и error-состояния на уровне компонентов и mock-сценариев;
- открыл детальную страницу аукциона из карточки и проверил основные данные, маршрут, груз, оплату, контакты и торговую панель;
- проверил режим ставки по ссылке `?bet=true`;
- проверил успешную ставку: обновление текущей цены, статуса участия, списка ставок и invalidation query cache;
- проверил ошибки формы ставки: пустое значение, значение вне min/max, неверный шаг и 422 validation error от MSW;
- проверил скрытые состояния `hide_bets_history`, `hide_points_address_and_contacts`, `hide_places`, `no_view_cargo_price`;
- проверил карту маршрута из карточки аукциона и расчет дистанции между городами;
- проверил светлую, темную и системную тему;
- проверил адаптивность списка, сайдбара фильтров, календаря, toolbar и страницы аукциона на узких экранах;
- проверил production URL [https://cargo-auctions.vercel.app/](https://cargo-auctions.vercel.app/) с включенным MSW.

## Тесты чистой логики

Минимальные unit-тесты добавлены на:

- `search params parsing`: `src/features/AuctionFilters/model/AuctionsListSearch.schema.test.ts`;
- `request builder`: `src/features/AuctionFilters/model/BuildAuctionsListRequest.test.ts`;
- validation schema ставки: `src/features/SetBet/model/AuctionBetForm.schema.test.ts`;
- бизнес-валидацию ставки: `src/entities/Auction/lib/ValidateAuctionBet.test.ts`;
- OpenAPI DTO-схемы списка, детальной карточки и ставок: `src/entities/Auction/model/*.schema.test.ts`;
- сериализацию query params: `src/shared/api/Request.test.ts`;
- расчет дистанции и route-map mapper: `src/shared/lib/RouteDistance.test.ts`, `src/widgets/RouteMap/model/BuildAuctionRouteMap.test.ts`.

Отдельный слой ViewModel-мапперов не выделялся: форматирование и подготовка данных оставлены рядом с соответствующими feature/widget/entity модулями. Покрыты чистые функции, которые фактически выполняют роль маппинга данных для UI.

## MSW

Моки находятся в `src/shared/api/msw`. Worker лежит в `public/mockServiceWorker.js` и нужен для работы MSW в браузере.

MSW включен по умолчанию и в локальной, и в production-сборке, потому что backend по заданию не предоставляется. Для отключения mock API можно задать `VITE_ENABLE_MSW=false`.

Реализованные mock endpoints:

- `POST /auctions/list`
- `GET /auctions/{auctionUuid}`
- `GET /auctions/{auctionUuid}/bets`
- `POST /auctions/{auctionUuid}/bets`

После отправки ставки mock-store обновляет цену, статус участия и историю ставок. Query-кеш списка, карточки и ставок инвалидируется.

## Функционал

| Блок | Статус | Комментарий |
| --- | --- | --- |
| React + TypeScript + Vite | Реализовано | Строгая TS-конфигурация, Vite-сборка проходит. |
| TanStack Router | Реализовано | Есть маршруты списка и карточки аукциона. |
| TanStack Query | Реализовано | Запросы, кеш, invalidation после ставки. |
| MSW вместо backend | Реализовано | Backend не нужен, данные приходят из MSW. |
| OpenAPI | Реализовано | Контракт сохранен в `src/shared/api/openapi.json`. |
| Feature-Sliced Design | Реализовано | Слои `app`, `pages`, `widgets`, `features`, `entities`, `shared`. |
| Zustand | Реализовано | UI-состояние фильтров списка. |
| shadcn/ui | Реализовано | Используются установленные компоненты shadcn/ui. |
| Список аукционов | Реализовано | Карточки, пагинация, сортировка, loading, skeleton, empty, error. |
| Фильтры списка | Реализовано | Реализованы основные фильтры из ТЗ, включая multi-value `statuses`. |
| Синхронизация URL | Реализовано | Search params валидируются Zod-схемой и отражают фильтры/пагинацию. |
| Карточка аукциона | Реализовано | Основные данные, маршрут, цена, статус, CTA. |
| Карта маршрута | Реализовано | Правая панель с Leaflet-картой и локальным mock-маршрутом между городами. |
| Детальная страница | Реализовано | Организатор, маршрут, груз, оплата, условия торгов, ставки. |
| Ставки | Реализовано | История ставок, пустые/скрытые состояния, mutation ставки. |
| Валидация ставки | Реализовано | Обязательность, min/max, step, ошибки 422, toasts. |
| React Hook Form + Zod | Реализовано | Форма ставки использует React Hook Form, Zod resolver и строковый ввод до transform, чтобы избежать ошибок `undefined` и native number-step. |
| Адаптивность | Реализовано | Desktop/mobile layout списка, фильтров и карточки. |
| Темная и светлая тема | Реализовано | ThemeProvider по подходу shadcn/ui dark mode. |
| Sonner | Реализовано | Toasts для ошибок и результата действий. |
| Тесты | Реализовано | Unit-тесты схем, построения запроса и логики ставки. |

## Что есть и чего нет

| Категория | Есть | Нет |
| --- | --- | --- |
| Данные | 50 mock-аукционов, детальные данные, ставки | Реального backend и внешней БД |
| UI | Список, фильтры, календарь, карточка, карта маршрута, детали, ставки, тема, production deploy на Vercel | Реального backend |
| Проверки | ESLint, TypeScript, Vitest, Vite build, Husky | E2E-тестов в браузере |
| Документация | README для запуска и проверки | Отдельных markdown-черновиков |

