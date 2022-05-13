const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

const applyTheme = (theme) => {
    const { classList } = document.documentElement
    if (theme === 'dark') {
        classList.add('dark');
    } else {
        classList.remove('dark');
    }
};

export default function (Alpine) {
    Alpine.data('navigation', () => ({
        state: {
            theme: 'light',
        },

        init() {           
            if (!localStorage.theme && window.matchMedia(`(prefers-color-scheme: ${DARK_THEME})`).matches) {
                this.state.theme = DARK_THEME;
            }
            if(localStorage.theme) {
                this.state.theme = localStorage.theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
            }
            applyTheme(this.state.theme);
        },
       
       

        toggleTheme() {
            
            this.state.theme = this.state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
            localStorage.theme = this.state.theme;

            console.log('toggle theme', this.state.theme);
            applyTheme(this.state.theme);
        },

        isDarkMode() {
            return this.state.theme === DARK_THEME;
        }

    }));
}
