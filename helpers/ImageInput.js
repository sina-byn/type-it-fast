class ImageInput {
    constructor(inputSelector, imgSelector) {
        const input = document.querySelector(inputSelector);
        const img = document.querySelector(imgSelector);

        input.addEventListener('input', e => {
            const file = e.target.files[0];

            if (!file) return;

            img.style.display = 'initial';
            img.src = URL.createObjectURL(file);
        });

        return img;
    }
}

export default ImageInput;