/* eslint-disable no-console */
const CACHE_NAME = `STATIC_V1.0`;

self.addEventListener(`install`, (evt) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        `/`,
      ]);
    });

  evt.waitUntil(openCache);
});

self.addEventListener(`activate`, () => {
  console.log(`Service worker activated`);
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
