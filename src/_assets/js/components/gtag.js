export default function (Alpine) {
    Alpine.data('gtag', () => ({
        init() {
            // https://developers.google.com/tag-platform/gtagjs/install

            // Configuration loaded from 11ty data (site.gtag)
            const config = JSON.parse(atob('{{site.gtag | toString | safe | btoa }}'));

            // gtags should be loaded only in production
            if (!config.hosts.includes(document.location.hostname)) return;


            const [id] = config.configs;
            if (!id) return;
            const src = config.src.replace('{id}', id);

            // gtag should be loaded only once.
            if (document.querySelector(`script[src="${src}"]`)) return;

            const script = document.createElement("script");
            script.setAttribute('src', src);
            script.setAttribute('async', true);
            script.onload = () => {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                config.configs.forEach((id) => gtag('config', id));
            };

            (document.head || document.body).appendChild(script);
        },
    }));
}
