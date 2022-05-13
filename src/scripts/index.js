import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect'
import navigation from './components/navigation';
import comments from './components/comments';
import gtag from './components/gtag';
import image from './components/image';
import drawer from './components/drawer';

Alpine.plugin(intersect);
Alpine.plugin(drawer);
Alpine.plugin(navigation);
Alpine.plugin(gtag);
Alpine.plugin(comments);
Alpine.plugin(image);

window.Alpine = Alpine;
window.Alpine.start();


const env = "{{site.env}}";

if (env === "production" && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function () {
      console.log("ServiceWorker has been registered!");
    })
    .catch(console.error);
}
