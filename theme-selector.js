// Color picker

const selectorTypes = {
    "color-picker-card": "--primary-card-color",
    "color-picker-card-open": "--primary-open-color",
    "color-picker-card-found": "--primary-found-color"
}
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
const imageUrls = {
    None: null,
    Random: "https://picsum.photos/200",
    Dogs: "https://dog.ceo/api/breeds/image/random",
    Cats: "https://api.thecatapi.com/v1/images/search"
};

const setDogImages = () => {
    frontFaces.forEach((face) => {
        fetch(imageUrls.Dogs)
            .then((response) => response.json())
            .then((json) => {
                face.style.backgroundImage = `url(${json.message})`;
            });
    })
}

const setCatImages = () => {
    frontFaces.forEach((face) => {
        fetch(imageUrls.Cats)
            .then((response) => response.json())
            .then((json) => {
                face.style.backgroundImage = `url(${json[0].url})`;
            });
    })
}

const setRandomImages = () => {
    frontFaces.forEach((face) => {
        fetch(imageUrls.Random)
            .then((response) => response.blob())
            .then((imageBlob) => {
                let imageUrl = URL.createObjectURL(imageBlob);
                face.style.backgroundImage = `url(${imageUrl})`;
            });
    })
}

const resetImages = () => {
    frontFaces.forEach((face) => {
        face.style.backgroundImage = null;
    })
}

function changeBackground(imageType) {
    switch (imageType) {
        case imageUrls.None:
            resetImages();
            break;
        case imageUrls.Random:
            setRandomImages();
            break;
        case imageUrls.Dogs:
            setDogImages()
            break;
        case imageUrls.Cats:
            setCatImages();
            break;
    }
}

let value;
imageSelector.addEventListener("change", () => {
    value = imageSelector.options[imageSelector.selectedIndex].value;
    changeBackground(imageUrls[value]);
})






