const imageSelector = document.getElementById("image-selector");
const frontFaces = document.querySelectorAll(".front-face")
const colorPickers = document.querySelectorAll(".color-picker input")
const settings = document.querySelector(".settings");
const id = localStorage.getItem("id");
const selectorTypes = {
    "color-picker-card": "--primary-card-color",
    "color-picker-card-open": "--primary-open-color",
    "color-picker-card-found": "--primary-found-color",
}
const imageUrls = {
    None: null,
    Random: "https://picsum.photos/200",
    Dogs: "https://dog.ceo/api/breeds/image/random",
    Cats: "https://api.thecatapi.com/v1/images/search",
};
let value;

// Check of de user ingelogd is. Zo ja, verstop dan de settings.
// Laad inplaats daarvan de settings van de user repository.

if (localStorage.getItem("token") !== null) {
    settings.style.display = "none";
    fetch(`http://localhost:8000/api/player/${id}/preferences`, {
        method: "get",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
    }).then((result) => {
        return result.json()
    }).then((r) => {
        console.log(r);
        if(r.color_closed !== "") document.documentElement.style.setProperty(selectorTypes["color-picker-card"], r.color_closed);
        if(r.color_found !== "") document.documentElement.style.setProperty(selectorTypes["color-picker-card-found"], r.color_found);
        if(r.preferred_api !== "") changeBackground(imageUrls[r.preferred_api]);
    });
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

imageSelector.addEventListener("change", () => {
    value = imageSelector.options[imageSelector.selectedIndex].value;
    changeBackground(imageUrls[value]);
})






