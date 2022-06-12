const selector = document.getElementsByClassName("image-selector");
console.log(selector);

for (let s of selector){
    s.addEventListener("click", function() {
        let options = s.querySelectorAll("option");
        console.log(options)
    })
}

const root = document.querySelectorAll(":root");
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