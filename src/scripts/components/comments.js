import { comments as config } from "../config";
const isDisqus = (config) => config.src.includes("disqus.com");
const isUtterances = (config) => config.src.includes("utteranc.es");

export default function (Alpine) {
  Alpine.data("comments", () => ({
    loaded: false,
    url: null,
    id: null,
    load() {
      if (this.loaded) return;
      this.loaded = true;
      const { url, id } = this;

      const script = document.createElement("script");

      for (const [key, value] of Object.entries(config)) {
        let newValue =
          typeof value === "string"
            ? value.replace("{url}", this.url).replace("{id}", this.id)
            : value;
        script.setAttribute(key, newValue);
      }

      if (isDisqus(config)) {
        window.page_config = { url, id };
        window.disqus_config = function () {
          const { url, id } = window.page_config;
          this.page.url = url;
          this.page.identifier = id;
        };
        script.setAttribute("data-timestamp", +new Date());
        this.$el.id = "disqus_thread";
        (document.head || document.body).appendChild(script);
      } else if (isUtterances(config)) {
        const { theme } = localStorage;
        if (theme) script.setAttribute("theme", `github-${theme}`);
        this.$el.appendChild(script);
      }
    },
  }));
}
