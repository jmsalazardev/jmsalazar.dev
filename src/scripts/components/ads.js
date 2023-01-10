import { ads as config } from "../config";

export default function (Alpine) {
  Alpine.data("ads", () => ({
    init() {
      // gtags should be loaded only in production
      if (!config.hosts.includes(document.location.hostname)) return;

      // gtag should be loaded only once.
      if (document.querySelector(`script[src="${config.attrs.src}"]`)) return;

      const script = document.createElement("script");
      for (const [key, value] of Object.entries(config.attrs)) {
        script.setAttribute(key, value);
      }

      let timeout;
      const loadScript = () => {
        document.removeEventListener("scroll", loadScript);
        document.removeEventListener("mousemove", loadScript);
        document.removeEventListener("touchstart", loadScript);
        if (timeout) clearTimeout(timeout);

        (document.head || document.body).appendChild(script);
      };

      timeout = setTimeout(loadScript, config.delay || 0);
      document.addEventListener("scroll", loadScript);
      document.addEventListener("mousemove", loadScript);
      document.addEventListener("touchstart", loadScript);
    },
  }));
}
