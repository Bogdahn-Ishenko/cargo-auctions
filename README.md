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

Git hooks:

- `pre-commit`: `pnpm check:pre-commit`
- `pre-push`: `pnpm check:pre-push`
- `commit-msg`: проверка Conventional Commits

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
| Фильтры списка | Частично | Реализованы основные фильтры из ТЗ. Одиночный `status` есть, отдельный multi-value `statuses` не выделен в UI. |
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

## AI usage

AI использовался для поэтапной разработки frontend-архитектуры, реализации mock API, экранов, валидации, визуальных исправлений и финальной сверки результата.

Критичные решения проверялись вручную по коду и тестами.

Отдельные AI-логи, черновики и временные документы не должны попадать в git. Для этого настроен `.gitignore`; итоговая информация для проверяющих находится в этом README.
