// * imports
import { renderWordsFromQuotes, calculateWPM } from './helpers/utils';
import { fetchData, getQuotes } from './api/api';
import Keyboard from './helpers/Keyboard';
import Timer from './helpers/Timer';

const updateCurrChar = (currCharEl, currChar, currIdx) => {
    currCharEl.classList.add('correct');
    currCharEl.classList.remove('incorrect');

    if (!currCharEl.nextSibling) return;

    currCharEl = currCharEl.nextSibling;
    currChar = currCharEl.dataset.char;
    currIdx++;

    const charsContainer = currCharEl.parentElement;
    const nextCharToFocus = charsContainer.children[currIdx + 4];

    if (nextCharToFocus)
        nextCharToFocus.focus();
    else
        charsContainer.lastChild.focus();

    return [currCharEl, currChar, currIdx];
};

(function () {
    const specialKeys = [
        'enter', 'control', 'alt',
        'backspace', 'shift', 'meta',
        'capslock', 'tab', 'escape',
        'delete', 'insert', 'home', 'end',
        'pagedown', 'pageup', 'arrowdown',
        'arrowup', 'arrowleft', 'arrowright'
    ];
    const fnRegex = /f\d\d?/;
    const keyboard = new Keyboard('.keyboard');
    const startModal = document.querySelector('.start-modal');
    const timerProgress = document.querySelector('.timer .progress');
    let currCharEl = null,
        currChar = null,
        correctChars = 0,
        started = false;

    const typeHandler = e => {
        if (!started) {
            timerProgress.classList.add('fill');
            startModal.style.display = 'none';
            new Timer('timer-1', 60);
            started = true;
            return;
        }

        const {
            key
        } = e;
        const keyboardKey = keyboard.getKeyEl(key);
        const isSpace = /\s/.test(key);
        const isSpecial = specialKeys.includes(key.toLowerCase()) ||
            fnRegex.test(key);

        if (keyboardKey) {
            keyboardKey.forEach(key =>
                key.classList.add('correct', 'pressed'));

            const timeout_1 = setTimeout(() => {
                keyboardKey.forEach(key =>
                    key.classList.remove('correct', 'pressed'));
                clearTimeout(timeout_1);
            }, 300);
        }

        if (isSpecial) return;

        if (isSpace) {
            e.preventDefault();
            if (currChar === 'space')
                [currCharEl, currChar, correctChars] = updateCurrChar(currCharEl, currChar, correctChars)

            return;
        }

        if (currChar === key) {
            [currCharEl, currChar, correctChars] = updateCurrChar(currCharEl, currChar, correctChars);
            return;
        }

        currCharEl.classList.add('incorrect', 'vibrate');

        const timeout_2 = setTimeout(() => {
            currCharEl.classList.remove('vibrate');
            clearTimeout(timeout_2);
        }, 300);
    };

    fetchData(getQuotes, (data) => {
        renderWordsFromQuotes(data);

        currCharEl = document.querySelector('.char');
        currChar = currCharEl.dataset.char;

        window.addEventListener('keydown', typeHandler);
    });

    window.addEventListener('timer-end', () => {
        window.removeEventListener('keydown', typeHandler);
        const wpm = calculateWPM(correctChars);
        console.log(wpm + 'wpm');
    });
})();