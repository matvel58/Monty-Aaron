# Monty-Aaron — Solana Meme Site

Лендинг для **$MONTY** на Solana — мем-токен, посвящённый виральному малышу-слонёнку Monty-Aaron, спасённому фондом [Following Giants](https://www.following-giants.com/) (финансируется [World Animal Protection](https://www.worldanimalprotection.org/)).

Сайт повторяет структуру и подачу [moodengsol.com](https://www.moodengsol.com/) (слоистый параллакс-герой, статы, история, биржи, токеномика, How-to-buy, маркер «Loved by millions», соцсети), но с собственным контентом, фото и видео Monty-Aaron.

## История проекта (что есть на сайте)

- **Monty-Aaron** — малыш-слонёнок, набравший ~250M просмотров за 3 дня.
- **Его мама Montif** — была атакована и почти погибла; спасена Following Giants.
- **Donation meta 2026** — Pumpfun добавил донаты, $MONTY — главный раннер новой meta.
- **Все фии** идут на World Animal Protection (фонд, поддерживающий Following Giants).
- **Виральные ссылки** встроены в сайт: Instagram, Facebook, Reddit, X / Twitter.

## Структура файлов

```
Monty-Aaron/
├── index.html        вся страница
├── styles.css        стили (jungle palette + параллакс-слои)
├── script.js         copy CA, mouse-parallax, scroll-parallax, reveal, video toggle
├── assets/
│   ├── monty-bath.png    главное фото — слонёнок в ванне (hero)
│   ├── monty-hose.png    со шлангом
│   ├── monty-tub.png     в ванне с тренером
│   ├── monty-fg.png      «Following Giants» — для donation-секции
│   ├── monty-1.mp4       видео #1 (Monty learning to be a helper)
│   ├── monty-2.mp4       видео #2 (Bath time)
│   ├── 1.jpg / 2.jpg / 3.jpg   старые ассеты (можно удалить)
├── _refs/            (HTML-копии исходного и референс-сайтов — для справки)
└── README.md
```

## Секции страницы (1:1 как у moodengsol.com)

1. **HERO** — слоистый параллакс-сцена с небом, солнцем, облаками, горами, джунглями, слонёнком (фото `monty-bath.png`) и листвой по углам. Реагирует на движение мыши и скролл.
2. **STATS / 3 KEYS** — 3 круглые карточки (250M+ Views / 1M+ Likes / 3 Days to break the internet).
3. **About Monty** — текстовый блок с историей Monty и Montif + 3-слойная круглая композиция фото.
4. **Donation Meta** — отдельная зелёная секция про Following Giants и World Animal Protection.
5. **Where to buy / Exchanges** — большая кнопка Pump.fun + сетка карточек (Pump.fun, Phantom, Jupiter, Raydium, + Soon: DEXScreener, DexTools, Binance, Coinbase).
6. **Tokenomics** — тёмно-синий блок с 3-слойным круглым фото слева и Network / Tax / Total Supply / Fees / Contract Address (с кнопкой Copy).
7. **How to buy** — 4 пронумерованных карточки с цветными угловыми кругами.
8. **Monty in action** — два встроенных видео (`monty-1.mp4`, `monty-2.mp4`).
9. **SHOP & MONTY-PFP** — два контрастных бокса.
10. **Loved by millions** — бесшовная карусель карточек с виральными постами (Instagram, Facebook, Reddit, X).
11. **Socials** — большие круглые кнопки: X / Twitter, Community, Instagram, Facebook, Reddit, Pump.fun.

## Ссылки

| Назначение | URL |
|---|---|
| Pump.fun | `https://pump.fun/coin/6aztCndC8EZwD9KmHjL2WWezCx1ZhQnavLG3ZrEtpump` |
| X / Twitter | `https://x.com/montaronfansol` |
| X Community | `https://x.com/i/communities/2018434774877327545` |
| Instagram (Monty) | `https://www.instagram.com/p/DV0zwM4jaqp/?img_index=1` |
| Instagram (Montif story) | `https://www.instagram.com/p/DYFTDgWkqb7/?img_index=1` |
| Facebook record | `https://www.facebook.com/share/r/1Cw2nZRR5d/` |
| Facebook viral | `https://www.facebook.com/share/r/18PemnxC9i/` |
| Facebook Reel | `https://www.facebook.com/reel/1509441260402904` |
| Reddit | `https://www.reddit.com/r/babyelephants/comments/1t9zhz1/baby_elephant_is_learning_how_to_be_a_helper_in/` |
| X post (PogNyx) | `https://x.com/PogNyx/status/2054317916921749679` |
| Following Giants | `https://www.following-giants.com/` |
| World Animal Protection | `https://www.worldanimalprotection.org/` |
| Contract | `6aztCndC8EZwD9KmHjL2WWezCx1ZhQnavLG3ZrEtpump` |

## Анимации

- **Параллакс по мыши** в hero и круглых композициях (About, Tokenomics)
- **Параллакс по скроллу** для слоёв heroes (sun / clouds / mountains / jungle / leaves)
- **Float / bob** — солнце, облака, маскот, круглые портреты
- **Bounce dot** у бейджа LIVE ON SOLANA
- **Marquee** — бесконечная карусель «Loved by millions» (пауза при наведении)
- **IntersectionObserver reveal** — мягкое появление карточек при скролле
- Поддержка `prefers-reduced-motion` (все анимации отключаются для пользователей, которым это нужно)

## Локальный запуск

Двойной клик по `index.html` — всё работает. Для надёжности (clipboard API, шрифты Google) лучше через локальный сервер:

```powershell
# PowerShell, из папки проекта:
python -m http.server 5500
# затем открой http://localhost:5500
```

Или через Node:

```powershell
npx serve .
```

## Деплой

Сайт статический — подойдёт любой хостинг:

- **Netlify Drop** — перетащи папку на [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `vercel deploy` из папки проекта
- **GitHub Pages** — запушь в репозиторий, в Settings → Pages выбери ветку и корневую папку
- **Cloudflare Pages** — подключи репозиторий, build command не требуется, output `/`

Видео `monty-1.mp4` (8 МБ) и `monty-2.mp4` (13 МБ) загрузятся вместе с сайтом — у Netlify/Vercel лимит файлов вполне укладывается.

## Кастомизация

- **Цвета**: переменные в начале `styles.css` (`:root { --gold, --teal, --jungle-1 ... }`).
- **Тексты**: всё в `index.html`.
- **Картинки**: положи новые в `assets/` и поменяй пути.
- **Шрифты**: Luckiest Guy, Fredoka, Bungee — Google Fonts.

## Что было сделано

- Скопированы 4 новых фото от пользователя в `assets/` с короткими именами.
- Перенесены 2 видео в `assets/`.
- Полностью переписана структура страницы в соответствии с **moodengsol.com**: слоистый параллакс-герой, 3 stats, about с круглой композицией, exchanges grid, токеномика с круглым 3-слойным фото, 4 шага how-to-buy, видео-секция, SHOP/PFP, marquee «Loved by millions», socials.
- Добавлена секция Donation Meta с историей Monty/Montif/Following Giants/WAP.
- Реализованы реальные анимации: параллакс по мыши, параллакс по скроллу, marquee, bob, glow, pulse, reveal-on-scroll.
- Чистый стек без сборщиков — открывается из коробки.
