window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const img = document.querySelector('.image-overlay');
            const canvas = document.querySelector('.my-canvas');
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }

            img.src = URL.createObjectURL(this.files[0]);
            img.classList.remove('image-overlay');
            canvas.classList.remove('my-canvas');

            img.classList.add('burger-img');
            canvas.classList.add('burger-img');
            const relevantSize = Math.min(img.height, img.width)

            img.style.clipPath = `circle(${relevantSize/2}px at 50% 50%)`

        }
    });
});