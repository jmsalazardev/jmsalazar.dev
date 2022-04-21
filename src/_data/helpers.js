module.exports = {
  currentYear() {
    const today = new Date();
    return today.getFullYear();
  },
  maskableIcons() {
    const icons = [48, 72, 96, 128, 192, 384, 512].map((size) => ({
      src: `maskable_icon_x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png'
    }));    

    icons.push({
      src: 'maskable_icon.png',
      sizes: '1080x1080',
      type: 'image/png',
      purpose: 'any maskable'
      
    });
    return icons;
  },
  appleIcons() {
    return [57, 72, 76, 114, 120, 144, 152, 180].map((size) => ({
      src: `apple-touch-icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png'
    }));
  }
};
