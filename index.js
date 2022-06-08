const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let randomLetters = [];
let numberOfCards = 36;


for (let i = 0; randomLetters.length < numberOfCards/2; i++){
    let x = alphabet[Math.floor(Math.random() * alphabet.length)];
    let temp = true;
    randomLetters.forEach(value => { if (x === value) temp = false; });
    if(temp){
        randomLetters.push(x);
    }
}
randomLetters = randomLetters.concat(randomLetters);
console.log(randomLetters);

const memoryCard = document.getElementsByClassName("memory-card");

for(let i = 0; i < memoryCard.length; i++){
    memoryCard[i].innerHTML=randomLetters[i];
}
