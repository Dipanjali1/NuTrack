let cacheName = "NuTrack";
let filesToCache = [
    '/',
    '/index.html',
    '/styles/Account.scss',
    '/styles/App.scss',
    '/styles/Auth.scss',
    '/styles/BMR.scss',
    '/styles/FoodCard.scss',
    '/styles/index.css',
    '/styles/Legend.scss',
    '/styles/Main.scss',
    '/styles/Navbar.scss',
    '/styles/NuReportCard.scss',
    '/styles/NuReportDisplay.scss',
    '/styles/Nutrition.scss',
    '/styles/Overview.scss',
    '/styles/OverviewPieChart.scss',
    '/services/Api.js',
    '/pages/Account.js',
    '/pages/BMRestimate.js',
    '/pages/Main.js',
    '/pages/NuReportDisplay.js',
    '/pages/Nutrition.js',
    '/pages/Overview.js',
    '/pages/SignIn.js',
    '/pages/SignUp.js',
    '/pages/Verification.js',
    '/components/App.js',
    '/components/CalorieBurnSuggestion.js',
    '/components/FoodCard.js',
    '/components/Legend.js',
    '/components/Navbar.js',
    '/components/NuReportCard.js',
    '/components/NuReportItem.js',
    '/components/OverviewPieChart.js',
    '../public/favicon.ico',
    '../public/logo192.png',
    '../public/logo512.png',
  ];
  
  /* Start the service worker and cache all of the app's content */
  self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  
  /* Serve cached content when offline */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
  