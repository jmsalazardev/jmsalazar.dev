import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import navigation from "./components/navigation";
import comments from "./components/comments";
import gtag from "./components/gtag";
import ads from "./components/ads";
import image from "./components/image";
import iframe from "./components/iframe";
import drawer from "./components/drawer";
import carousel from "./components/carousel";

Alpine.plugin(intersect);
Alpine.plugin(drawer);
Alpine.plugin(navigation);
Alpine.plugin(gtag);
Alpine.plugin(ads);
Alpine.plugin(comments);
Alpine.plugin(image);
Alpine.plugin(iframe);
Alpine.plugin(carousel);

window.Alpine = Alpine;
window.Alpine.start();

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function () {
      console.log("ServiceWorker has been registered!");
    })
    .catch(console.error);
}
