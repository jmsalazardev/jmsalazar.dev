import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect'
import navigation from './components/navigation';
import comments from './components/comments';
import image from './components/image';

Alpine.plugin(intersect);
Alpine.plugin(navigation);
Alpine.plugin(comments);
Alpine.plugin(image);

window.Alpine = Alpine;
window.Alpine.start();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function () {
      console.log("ServiceWorker has been registered!");
    })
    .catch(console.error);
}
