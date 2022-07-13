const imageSelector = document.getElementById("image-selector");
const frontFaces = document.querySelectorAll(".front-face");
const colorPickers = document.querySelectorAll(".color-picker input");
const loadingSpinner = document.querySelector("#loading");
const selectorTypes = {
    "color-picker-card": "--primary-card-color",
    "color-picker-card-open": "--primary-open-color",
    "color-picker-card-found": "--primary-found-color",
}

let images = new Map();
const uniqueImageCount = 10;
const imageApis = {
    None: {
        url: null,
    },
    Random: {
        url: "https://picsum.photos/200",
    },
    Dogs: {
        url: "https://dog.ceo/api/breeds/image/random"
    },
    Cats: {
        url: "https://api.thecatapi.com/v1/images/search"
    },
};


async function fetchImages(imageApis) {
    for (const api of Object.keys(imageApis)) {
        if (api.toLowerCase() === "none") continue;
        let imageArray = [];
        for (let i = 0; i < uniqueImageCount; i++) {
            await fetch(imageApis[api].url)
                .then((r) => {
                    if (api.toLowerCase() === "random") return r;
                    return r.json()
                })
                .then((data) => {
                    if (api.toLowerCase() === "cats") imageArray.push(data[0].url);
                    if (api.toLowerCase() === "dogs") imageArray.push(data.message);
                    if (api.toLowerCase() === "random") imageArray.push(data.url)
                })
        }
        images.set(api, imageArray);
    }
}

if (!localStorage.imageMap) {
    fetchImages(imageApis).then(() => {
        loadingSpinner.style.display = "none";
        localStorage.imageMap = JSON.stringify(Array.from(images.entries()));
    });
} else {
    images = new Map(JSON.parse(localStorage.imageMap));
    loadingSpinner.style.display = "none";
    console.log(images);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Color picker

function changeColor() {
    document.documentElement.style.setProperty(selectorTypes[this.id.toString()], this.value);
}

colorPickers.forEach((cp) => {
    cp.addEventListener("change", changeColor)
})

// Image Selector

const setDogImages = () => {
    frontFaces.forEach((face) => {
        face.style.backgroundImage = `url(${images.get("Dogs")[getRandomInt(uniqueImageCount)]})`;
    })
}

const setCatImages = () => {
    frontFaces.forEach((face) => {
        face.style.backgroundImage = `url(${images.get("Cats")[getRandomInt(uniqueImageCount)]})`;
    })
}

const setRandomImages = () => {
    frontFaces.forEach((face) => {
        face.style.backgroundImage = `url(${images.get("Random")[getRandomInt(uniqueImageCount)]})`;
    })
}

const resetImages = () => {
    frontFaces.forEach((face) => {
        face.style.backgroundImage = null;
    })
}

function changeBackground(imageType) {
    switch (imageType) {
        case imageApis.None:
            resetImages();
            break;
        case imageApis.Random:
            setRandomImages();
            break;
        case imageApis.Dogs:
            setDogImages()
            break;
        case imageApis.Cats:
            setCatImages();
            break;
    }
}

imageSelector.addEventListener("change", () => {
    let value = imageSelector.options[imageSelector.selectedIndex].value;
    changeBackground(imageApis[value]);
})






