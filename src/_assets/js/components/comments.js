export default function (Alpine) {
    Alpine.data('comments', () => ({
        loaded: false,
        load() {
            if (this.loaded) return;
            this.loaded = true;
            const script = document.createElement("script");
            script.src = "https://jmsalazardev.disqus.com/embed.js";
            script.setAttribute("data-timestamp", +new Date());
            (document.head || document.body).appendChild(script);
        },
    }));
}
