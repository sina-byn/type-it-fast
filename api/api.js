// * imports
import fallBackQuotes from '../data/quotes.json';

const fetchData = async (fetcher, callback) => {
    const data = await fetcher();
    callback(data);
};

const getQuotes = async () => {
    try {
        const res = await fetch('https://type.fit/api/quotes');
        const data = await res.json();

        return data;
    } catch(err) {
        return fallBackQuotes;
    }
};

export { fetchData, getQuotes };