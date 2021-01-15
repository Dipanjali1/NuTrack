let cacheName = "NuTrack";
let filesToCache = [
    '/',
    '/index.html',
    '../src/style/Account.scss',
    '../src/style/App.scss',
    '../src/style/Auth.scss',
    '../src/style/BMR.scss',
    '../src/style/FoodCard.scss',
    '../src/style/index.css',
    '../src/style/Legend.scss',
    '../src/style/Main.scss',
    '../src/style/Navbar.scss',
    '../src/style/NuReportCard.scss',
    '../src/style/NuReportDisplay.scss',
    '../src/style/Nutrition.scss',
    '../src/style/Overview.scss',
    '../src/style/OverviewPieChart.scss',
    '../src/services/Api.js',
    '../src/pages/Account.js',
    '../src/pages/BMRestimate.js',
    '../src/pages/Main.js',
    '../src/pages/NuReportDisplay.js',
    '../src/pages/Nutrition.js',
    '../src/pages/Overview.js',
    '../src/pages/SignIn.js',
    '../src/pages/SignUp.js',
    '../src/pages/Verification.js',
    '../src/components/App.js',
    '../src/components/CalorieBurnSuggestion.js',
    '../src/components/FoodCard.js',
    '../src/components/Legend.js',
    '../src/components/Navbar.js',
    '../src/components/NuReportCard.js',
    '../src/components/NuReportItem.js',
    '../src/components/OverviewPieChart.js',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
  ];
  
  /* Start the service worker and cache all of the app's content */
  self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      }).catch(err => {
        console.log(err);
      })
    );
  });
  
  /* Serve cached content when offline */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      }).catch(() => {
        //If both fail, show a generic fallback
        return caches.match('/offline.html');
      })
    );
  });
  