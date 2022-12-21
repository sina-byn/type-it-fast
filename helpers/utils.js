// * imports
import Word from "./Word";

const generateIntWithinRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const generateWordsFromQuotes = (arr, count = 20) => {
    const { length } = arr;
    const words = [];

    for (let i = 0; i < count; i++) {
        const randomIdx = generateIntWithinRange(0, length - 1);
        words.push(...arr[randomIdx].text.split(''));
    }

    return words;
};

const renderWordsFromQuotes = quotes => {
    const words = generateWordsFromQuotes(quotes);
    words.forEach(word => new Word(word));
};

const calculateWPM = (chars, minutes = 1) => {    
    const words = chars / 5 ;
    return words / minutes;
};

export { renderWordsFromQuotes, calculateWPM };