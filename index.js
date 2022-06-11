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

const cards = document.querySelectorAll(".memory-card");
const backFaces = document.querySelectorAll(".back-face")

backFaces.forEach((face, index) => {
    face.innerHTML=randomLetters[index];
})

cards.forEach(function (card) {
    card.addEventListener('click', function () {
        cards.forEach(function (c) {
            if (c !== card) c.classList.remove('flip');
            else c.classList.toggle('flip');
        });
    });
});
