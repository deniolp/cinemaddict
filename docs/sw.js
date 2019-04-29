/* eslint-disable no-console */
let path = `/cinemaddict/`;
if (location.host === `localhost:8081`) {
  path = `/`;
}
const CACHE_NAME = `STATIC_V1.0`;
const urlsToCache = [
  path,
  `./index.html`,
  `./bundle.js`,
  `./css/main.css`,
  `./css/normalize.css`,
  `./images/posters/accused.jpg`,
  `./images/posters/blackmail.jpg`,
  `./images/posters/blue-blazes.jpg`,
  `./images/posters/fuga-da-new-york.jpg`,
  `./images/posters/moonrise.jpg`,
  `./images/posters/three-friends.jpg`,
  `./images/background.png`,
  `./images/icon-favorite.png`,
  `./images/icon-favorite.svg`,
  `./images/icon-watched.png`,
  `./images/icon-watched.svg`,
  `./images/icon-watchlist.png`,
  `./images/icon-watchlist.svg`,
];

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener(`activate`, () => {
  console.log(`Service worker activated!`);
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      fetch(evt.request)
      .then(function (response) {
        caches.open(CACHE_NAME)
        .then((cache) => cache.put(evt.request, response.clone()));

        return response.clone();
      })
      .catch(() => {
        caches.match(evt.request)
        .then((response) => {
          console.log(`Find in cache`, {response});
          return response;
        });
      })
    .catch((error) => console.error(error))
  );
});
