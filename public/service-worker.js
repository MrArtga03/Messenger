// Название кэша - для каждого изменения кода стоит переименовывать
var CACHE = 'cache'

// Отлавливаем событие установки воркера
self.addEventListener('install', function (evt) {
  evt.waitUntil(precache())
})

// На событии fetch используем кэш, но обновляем при появлении нового контента
self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.')
  evt.respondWith(fromCache(evt.request))
  evt.waitUntil(update(evt.request))
})

// Записываем, что конкретно нам нужно кэшировать
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './',
      '/assets/MWA.png',
      '/assets/global.css',
      '/assets/logos/favicon.ico',
      '/assets/logos/yellow 192.png',
      '/assets/logos/yellow 512.png',
      '/robots.txt',
    ])
  })
}

// При запросе проверяем, есть ли в кэше нужный ресурс. Если да, отдаем кэш
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || null
    })
  })
}

// Обновление состоит из открытия кэша, обработки сетевых запросов
// и сохранения новых данных
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response)
    })
  })
}
