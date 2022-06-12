// Color picker

const selectorTypes = {"color-picker-card": "--primary-card-color", "color-picker-card-open": "--primary-open-color", "color-picker-card-found": "--primary-found-color"}
const colorPickers = document.querySelectorAll(".color-picker input")

function changeColor() {
    document.documentElement.style.setProperty(selectorTypes[this.id.toString()], this.value);
}

colorPickers.forEach((cp) => {
    cp.addEventListener("change", changeColor)
})

// Image Selector

const imageSelector = document.getElementById("image-selector");
const frontFaces = document.querySelectorAll(".front-face");
const imageUrls = {None: null, Random: "https://picsum.photos/200", Dogs: "https://dog.ceo/api/breeds/image/random", Cats: "https://placekitten.com/640/360"};

function changeBackground(imageType) {
    if (imageUrls[imageType] === null) {
        frontFaces.forEach((face) => {
            face.style.backgroundImage = null;
        })
        return;
    }

    frontFaces.forEach((face) => {
        fetch(imageUrls[imageType])
            .then((response) => response.blob())
            .then((imageBlob) => {
                let imageUrl = URL.createObjectURL(imageBlob);
                face.style.backgroundImage = `url(${imageUrl})`;
            });
    })
}

let value;

imageSelector.addEventListener("change", () => {
    value = imageSelector.options[imageSelector.selectedIndex].value;
    changeBackground(value);
})






