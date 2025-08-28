// Define o nome do cache e os ficheiros essenciais para o modo offline.
const CACHE_NAME = 'cronometro-cache-v1';
const urlsToCache = [
    '/',
    './index.html',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

// Evento de Instalação: Guarda os ficheiros em cache quando o Service Worker é instalado.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de Fetch: Interceta os pedidos de rede.
// Se o recurso estiver em cache, entrega a versão guardada (offline).
// Se não estiver, vai à rede para o obter.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se encontrar no cache, retorna a resposta do cache
                if (response) {
                    return response;
                }
                // Senão, faz o pedido à rede
                return fetch(event.request);
            })
    );
});
