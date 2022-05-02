export default function (Alpine) {
    Alpine.data('navigation', () => ({
        open: false,

        toggle() {
            console.log('toggle', this.open);
            this.open = ! this.open;
        },

       

    }));
}
