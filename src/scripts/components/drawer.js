export default function (Alpine) {
    Alpine.data('drawer', () => ({
        state: {
            open: false,
        },

        toggle() {
            this.state.open = ! this.state.open;
        },
        
        open() {
            this.state.open = true;
        },

        close() {
            this.state.open = false;
        },
        isOpen() {
            return this.state.open === true;
        },
        isClosed() {
            return this.state.open === false;
        }

    }));
}
