# onlyme-landing

Landing type Goaffii / My Private pour Prelinker.

Édite uniquement `config.js` :

- `logo` / `banner`
- `nbPosts`, `nbVideos`, `nbLikes`
- `stories[]` : `image`, `name`, `blurred` (1–5)
- `live.startAt` / `live.endAt` (`00:00`–`00:00` = live 24h)
- `live.gif` remplace l’avatar pendant le créneau
- `live.viewers`
- `posts[]` : `image`, `blurred`, `video` (6–15 recommandés)
- `hideOfferPopup`

Pendant `liveStartAt`–`liveEndAt`, l’avatar passe sur `gifOfLive` et le badge LIVE s’affiche.
Les posts avec `blurred: true` sont floutés + cadenas.
