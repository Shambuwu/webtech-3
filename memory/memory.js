const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const cards = document.querySelectorAll(".memory-card");
const backFaces = document.querySelectorAll(".back-face");
const resetButton = document.querySelectorAll(".reset-button")[0];
const counter = document.querySelector("#counter");
const remainingTime = document.querySelector("#remaining-time");
const foundPairs = document.querySelector("#found-pairs");
let randomLetters = [];
let numberOfCards = 36;
let hasFlippedCard = false;
let hasSecondFlippedCard = false;
let firstCard, secondCard;
let amountOfFoundCards = 0;
let count = 0;
let time = 999;



for (let i = 0; randomLetters.length < numberOfCards; i++) {
    let x = alphabet[Math.floor(Math.random() * alphabet.length)];
    if(!(randomLetters.includes(x))){
        randomLetters.push(x);
        randomLetters.push(x);
    }

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

randomLetters = shuffle(randomLetters);

backFaces.forEach((face, index) => {
    face.innerHTML = randomLetters[index];
})

function flipCard() {
    this.removeEventListener("click", flipCard);
    this.classList.add("flip");
    if (!hasFlippedCard) {
        this.removeEventListener("click", flipCard);
        hasFlippedCard = true;
        firstCard = this;
    } else if (!hasSecondFlippedCard) {
        this.removeEventListener("click", flipCard);
        hasSecondFlippedCard = true;
        secondCard = this;
        checkMatch()
    } else {
        unflipCards();
        hasFlippedCard = true;
        hasSecondFlippedCard = false;
        firstCard = this;
    }
}

const unflipCards = () => {
    firstCard.classList.remove("flip");
    firstCard.addEventListener("click", flipCard);

    secondCard.classList.remove("flip");
    secondCard.addEventListener("click", flipCard);
}

const setFoundCards = () => {
    firstCard.removeEventListener("click", flipCard);
    firstCard.classList.add("found");

    secondCard.removeEventListener("click", flipCard);
    secondCard.classList.add("found");

    hasFlippedCard = false;
    hasSecondFlippedCard = false;

    amountOfFoundCards += 2;
    foundPairs.innerHTML = "Amount of pairs found: " + amountOfFoundCards;
    if (amountOfFoundCards === 36) {
        displayWinMessage(500);
    }
}

const checkMatch = () => {
    if (firstCard.innerText.split("\n")[1] === secondCard.innerText.split("\n")[1]) {
        setFoundCards()
        return true;
    }
    return false;
}

const displayWinMessage = (timeout) => {
    clearInterval(interval);
    setTimeout(() => {
        alert("You won!");
    }, timeout);
}

function resetGame() {
    randomLetters = shuffle(randomLetters);

    setTimeout(() => {
        backFaces.forEach((face, index) => {
            face.innerHTML = randomLetters[index];
        })
    }, 200);

    cards.forEach((card) => {
        card.classList.remove("flip", "found")
        card.addEventListener("click", flipCard);
    })
    hasFlippedCard = false;
    hasSecondFlippedCard = false;
    firstCard = null;
    secondCard = null;
    amountOfFoundCards = 0;
    count = 0;
    time = 999;
    foundPairs.innerHTML = "Amount of pairs found: " + amountOfFoundCards;
}

resetButton.addEventListener("click", resetGame);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
})

let interval = setInterval(function(){
    count++;
    time--;
    counter.innerHTML = "Time spent: " + count;
    remainingTime.innerHTML = "Time remaining: " + time;
}, 1000);