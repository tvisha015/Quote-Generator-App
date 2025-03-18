// HTML elements ko select kiya
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy");
const tweetBtn = document.getElementById("tweet");
const exportBtn = document.getElementById("export");

//1. API se random quote fetch kiya
async function getQuote() {
    try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        const result = await response.json();
        
        console.log(result); // Helped for Debugging

        if (result.success && result.data && result.data.content) {
            quoteText.innerText = `"${result.data.content}"`; 
            authorText.innerText = `- ${result.data.author || "Unknown"}`;
        } else {
            quoteText.innerText = "No quote found!";
            authorText.innerText = "- Unknown";
        }
    } catch (error) {
        console.log("Error fetching quote:", error);
        quoteText.innerText = "Failed to fetch quote!";
        authorText.innerText = "- Error";
    }
}

//2. Copy to quote to clipboard
copyBtn.addEventListener("click", () => {
    const quoteToCopy = `${quoteText.innerText} ${authorText.innerText}`;
    
    navigator.clipboard.writeText(quoteToCopy).then(() => {
        alert("Quote copied to clipboard!");
    }).catch(err => {
        console.log("Copy failed : ", err);
    });
});

//3. Tweet the quote functionality
tweetBtn.addEventListener("click", () => {
    const quoteToTweet = `${quoteText.innerText} ${authorText.innerText}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteToTweet)}`;
    window.open(tweetUrl, "_blank");
});

//4. Export quote as image
exportBtn.addEventListener("click", () => {
    const quoteBox = document.querySelector(".quote-box");

    // Temporary dark text color for better visibility
    quoteBox.style.color = "#000";  // Dark color
    quoteBox.style.background = "rgba(255, 255, 255, 0.8)"; // Light background for contrast

    html2canvas(quoteBox, { backgroundColor: null }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "quote.png";
        link.click();

        quoteBox.style.color = "";  // original style set ki 
        quoteBox.style.background = "";
    });
});

newQuoteBtn.addEventListener("click", getQuote);

getQuote();
