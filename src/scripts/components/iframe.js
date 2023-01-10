export default function (Alpine) {
  Alpine.data("iframe", () => ({
    loaded: false,
    src: null,
    load() {
      if (this.loaded) return;
      this.loaded = true;
      const iframe = this.$refs.iframe;
      const { src } = this;
      iframe.src = src;
    },
  }));
}
