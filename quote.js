

// DOM 
const quotCon = document.getElementById('quote-container');

const quoteText = document.getElementById('quote');

const authorName = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');




// https://type.fit/api/quotes
//**** TO GENRATE NEW QUOTE( new QUOTE from our API)******//

let apiQuote = [];

//show loading
function loading(){
    loader.hidden = false;
    quotCon.hidden = true;
}

function complete(){
    quotCon.hidden = false;
    loader.hidden = true;

}

function newQuote() {

    loading()
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    console.log(quote);

    if(!quote.author){                          //in case the author name is not available or written
        authorName.textContent = 'unknown'
    }else {
        authorName.textContent =quote.author
    }

    // Check quote lenght to determine the styling

    if(quote.text.length > 50) {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.Text

    authorName.textContent = quote.author
    quoteText.textContent = quote.text

    complete()
}

async function getQuote() {
    const apiUrl = "https://type.fit/api/quotes"

    loading()
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json()

        console.log(apiQuote)

        newQuote()


    }catch(error) {
        console.log(error)
    }
}


function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorName.textContent}`
    window.open(twitterUrl, "_blank")
}

// Event Listener   (so that when we click on new quote button, it will bring new quote)
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


getQuote() 



