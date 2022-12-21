class Word {
    constructor(word) {
        const chars = word.split('');
        this.renderChars(chars);
    }

    renderChars = chars => {
        chars.forEach(char => {
            const charEl = document.createElement('button');
            const isSpace = /\s/.test(char);

            if (isSpace)
                charEl.dataset.char = 'space';
            else
                charEl.dataset.char = char;

            charEl.textContent = char;
            charEl.className = `char ${isSpace ? "space" : ''}`;

            document.querySelector('.chars').appendChild(charEl);
        });
    };
}

export default Word;