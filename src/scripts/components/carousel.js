const INDICATOR_DEFAULT_COLOR = "bg-slate-500";
const INDICATOR_CURRENT_COLOR = "bg-white";

export default function (Alpine) {
  Alpine.data("carousel", () => ({
    defaultPosition: 0,
    interval: 3000,
    activeItemPosition: 0,
    lastItemPosition: 0,
    items: [],
    indicators: [],
    _intervalId: null,
    init() {
      this.items = [...this.$refs.items.querySelectorAll("div")];
      this.indicators = [...this.$refs.indicators.querySelectorAll("button")];
      this.lastItemPosition = this.items.length - 1;
      this.change();
    },
    cycle() {
      this._intervalId = setInterval(() => {
        if (this.activeItemPosition < this.lastItemPosition) {
          this.next();
        } else {
          this.slideTo(0);
        }
      }, this.interval);
    },
    pause() {
      if (!this._intervalId) return;
      clearInterval(this._intervalId);
    },
    next() {
      if (this.activeItemPosition < this.lastItemPosition) {
        this.activeItemPosition++;
        this.change();
      }
    },
    prev() {
      if (this.activeItemPosition > 0) {
        this.activeItemPosition--;
        this.change();
      }
    },
    slideTo(position) {
      if (position >= 0 && position <= this.lastItemPosition) {
        this.activeItemPosition = position;
        this.change();
      }
    },
    change() {
      this.items.forEach((item, index) => {
        if (index === this.activeItemPosition) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      this.indicators.forEach((item, index) => {
        if (index === this.activeItemPosition) {
          item.setAttribute("aria-current", "true");
          item.classList.add(INDICATOR_CURRENT_COLOR);
          item.classList.remove(INDICATOR_DEFAULT_COLOR);
        } else {
          item.setAttribute("aria-current", "false");
          item.classList.remove(INDICATOR_CURRENT_COLOR);
          item.classList.add(INDICATOR_DEFAULT_COLOR);
        }
      });
    },
  }));
}
