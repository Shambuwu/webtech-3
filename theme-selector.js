// Color picker

const cardColorPicker = document.getElementById("color-picker-card");
const openCardColorpicker = document.getElementById("color-picker-card-open");
const foundCardColorPicker = document.getElementById("color-picker-card-found");
const colorPickers = [cardColorPicker, openCardColorpicker, foundCardColorPicker];

function changeColor() {
    switch(this.id){
        case "color-picker-card":
            document.documentElement.style.setProperty("--primary-card-color", this.value);
            break;
        case "color-picker-card-open":
            document.documentElement.style.setProperty("--primary-open-color", this.value);
            break;
        case "color-picker-card-found":
            document.documentElement.style.setProperty("--primary-found-color", this.value);
            break;
    }
}

colorPickers.forEach((cp) => {
    cp.addEventListener("change", changeColor)
})

// Image Selector

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const selector = document.getElementById("image-selector");
const frontFaces = document.querySelectorAll(".front-face");
const imageUrls = {Random: "https://picsum.photos/200", Dogs: "https://dog.ceo/api/breeds/image/random", Cats: "https://placekitten.com/640/360"};

let value = selector.options[selector.selectedIndex].value;
selector.addEventListener("change", () => {
    value = selector.options[selector.selectedIndex].value;
    changeBackground(value);
})

function changeBackground(imageType) {
    frontFaces.forEach((face) => {
        fetch(imageUrls[value])
            .then((response) => response.blob())
            .then((imageBlob) => {
                let imageUrl = URL.createObjectURL(imageBlob);
                face.style.backgroundImage = `url(${imageUrl})`;
            });
    })
}

changeBackground(imageUrls.Random)






