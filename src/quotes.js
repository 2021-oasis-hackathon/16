const quotes = [
    {
        quote: "You couldn't be that good and not know it, somewhere in your secret heart, however much you'd been abused into affecting public humility.",
        author: "Lois McMaster Bujold",
    },
    {
        quote: "Men will fight long and hard for a bit of colored ribbon.",
        author: "Napoleon Bonaparte",
    },
    {
        quote: "A friend should bear his friend's infirmities.",
        author: "William Shakespeare",
    },
    {
        quote: "When the judgement's weak, The prejudice is strong.",
        author: "Kane O'Hara",
    },
    {
        quote: "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.",
        author: "George Bernard Shaw",
    },
    {
        quote: "A truly great book should be read in youth, again in maturity and once more in old age, as a fine building should be seen by morning light, at noon and by moonlight.",
        author: "Robertson Davies",
    },
    {
        quote: "No great genius has ever existed without some touch of madness.",
        author: "Aristotle",
    },
    {
        quote: "I believe that if you show people the problems and you show them the solutions they will be moved to act.",
        author: "Bill Gates",
    },
    {
        quote: "Winter lies too long in country towns; hangs on until it is stale and shabby, old and sullen.",
        author: "Willa Cather",
    },
    {
        quote: "We don't receive wisdom; we must discover it for ourselves after a journey that no one can take for us or spare us.",
        author: "Marcel Proust",
    }
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)]; // floor : 내림, random: 0 ~ 1

quote.innerText = `"${todaysQuote.quote}"`;
author.innerText = `- ${todaysQuote.author} -`;