importScripts('workbox-v6.1.5/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: 'workbox-v6.1.5/',
  mode: 'production',
});

importScripts('workbox-v6.1.5/workbox-strategies.prod.js');
importScripts('workbox-v6.1.5/workbox-broadcast-update.prod.js');

const precacheManifest = self.__WB_MANIFEST;
workbox.precaching.precacheAndRoute(precacheManifest, {});

const bc = new BroadcastChannel('sync-channel');

const dataCacheConfig = {
  cacheName: 'quote-data',
  networkTimeoutSeconds: 1,
  plugins: [
    new workbox.broadcastUpdate.BroadcastUpdatePlugin('data-updated-channel')
  ]
};

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('quotes-queue', {
  maxRetentionTime: 24 * 60,
  onSync: async ({queue}) => {
    await queue.replayRequests();
    bc.postMessage({
      finished: true 
    });
  },
});

workbox.routing.registerRoute(
  new RegExp('https://service-forum\\.herokuapp\\.com/.*post'),
  new workbox.strategies.StaleWhileRevalidate(
    dataCacheConfig
  ), 'GET'
);

workbox.routing.registerRoute(
  new RegExp('https://service-forum\\.herokuapp\\.com/.*[0-9]+'),
  new workbox.strategies.StaleWhileRevalidate(
    dataCacheConfig
  ), 'GET'
);

workbox.routing.registerRoute(
  new RegExp('https://service-forum\\.herokuapp\\.com/.*create'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]}
  ), 'POST'
);

workbox.routing.registerRoute(
  new RegExp('https://service-forum\\.herokuapp\\.com/.*comment'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]}
  ), 'POST'
);

self.addEventListener('activate', () => {
  clients.claim();
});

/*
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
*/























/*
class QuotesStrategy extends workbox.strategies.Strategy {
  async _handle(request, handler) {
    const fetchAndCachePromise = handler.fetchAndCachePut(request);

    let response = await handler.cacheMatch(request);

    if (!response) {
      try {
        response = await fetchAndCachePromise;
      } catch (err) {
        console.log(err);
      }
      if (!response) {
        throw new WorkboxError('no-response', {url: request.url, error});
      }
      return response;
    }

    fetchAndCachePromise
      .then(async res => {
        const res1 = await res.clone().json();
        const res2 = await response.clone().json();
        let shouldRefresh = false;

        if (Array.isArray(res1.data)) {
          shouldRefresh = res1.data.length !== res2.data.length;
          console.log('usao 1', shouldRefresh);
        } else if (Array.isArray(res1.data.comments) && Array.isArray(res2.data.comments)) {
          shouldRefresh = res1.data.comments.length !== res2.data.comments.length;
          console.log('usao 2', shouldRefresh);
        }
        if (shouldRefresh) {
          console.log('usao 3');
          bc.postMessage({ finished: true });
        }
      }).catch(err => console.log(err));

    return response.clone();
  }
}
*/