import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect'
import navigation from './components/navigation';
import comments from './components/comments';
// import disqus from './components/disqus';
// import utterances from './components/utterances';
import image from './components/image';

Alpine.plugin(intersect);
Alpine.plugin(navigation);
// Alpine.plugin(disqus);
// Alpine.plugin(utterances);
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
