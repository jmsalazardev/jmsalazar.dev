export default function (Alpine) {
    Alpine.data('image', () => ({
        loaded: false,
        src: null,
        width: null,
        height: null,
       
        load() {
            if (this.loaded) return;
            this.loaded = true;

            // console.log({width: this.width, height: this.height, src: this.src })
            const img = this.$refs.image;
            const {src, width, height} = this;
            
            const url = new URL(src);

            let dpr = 1;
            if ([...img.classList].includes("logo")) {
                dpr = 2;
            } else if (window.devicePixelRatio) {
                dpr = window.devicePixelRatio;
            }

            let newWidth = Math.ceil(img.offsetWidth * dpr);
            let newHeight = 0;
            let aspectRatio = 0;
            if (width > height) {
                aspectRatio = width / height;
                newHeight = Math.round(newWidth / aspectRatio);
            } else if (height > width) {
                aspectRatio = height / width;
                newHeight = Math.round(newWidth * aspectRatio);
            } else {
                newHeight = newWidth;
            }

            img.setAttribute("width", newWidth);
            img.setAttribute("height", newHeight);
            img.classList.add('lazyloaded');

            if (url.host === 'lh3.googleusercontent.com') {
                img.src = `${src}=w${newWidth}-h${newHeight}-rw-c`;
            } else {
                img.src = src;
            }


        },
    }));
}
