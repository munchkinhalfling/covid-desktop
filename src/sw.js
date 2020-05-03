importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(/source/, ({url, event}) => {
  console.log('Someone wants the credits.');
  return Response.redirect('https://covidtracking.com', 301);
});
workbox.routing.registerRoute(
    /.*/,
    new workbox.strategies.NetworkFirst()
)