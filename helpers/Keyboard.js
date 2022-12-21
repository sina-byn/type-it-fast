import keys from '../data/keys.json';

class Keyboard {
    constructor(selector) {
        this.keyboardEl = document.querySelector(selector);

        keys.forEach(key => this.renderKey(key));
    }

    renderKey(key) {
        const isArray = Array.isArray(key);
        const keyEl = document.createElement('button');

        if (isArray) {
            const [text, id, className] = key;

            keyEl.id = `key-${id || text}`;
            keyEl.textContent = text;
            keyEl.className = `keyboard-key ${className || ''}`;
        } else {
            keyEl.id = `key-${key}`;
            keyEl.textContent = key;
            keyEl.className = 'keyboard-key';
        }

        this.keyboardEl.appendChild(keyEl);
    }

    getKeyEl(key) {
        switch (key) {
            case ' ':
                return this.keyboardEl.querySelectorAll('#key-space');
            case '[':
                return this.keyboardEl.querySelectorAll('#key-bracket-open');
            case ']':
                return this.keyboardEl.querySelectorAll('#key-bracket-close');
            case '\\':
                return this.keyboardEl.querySelectorAll('#key-backslash');
            case '/':
                return this.keyboardEl.querySelectorAll('#key-slash');
            case ',':
                return this.keyboardEl.querySelectorAll('#key-comma');
            case '.':
                return this.keyboardEl.querySelectorAll('#key-dot');
            default:
                const id = `#key-${key.toLowerCase()}`
                const isValidId = /[A-Za-z][\w-.]*$/.test(id);
                return isValidId
                    ? this.keyboardEl.querySelectorAll(id)
                    : null;
        }
    }
};

export default Keyboard;