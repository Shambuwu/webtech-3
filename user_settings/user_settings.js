const saveButton = document.querySelector(".save-button");
const id = localStorage.getItem("id");
const closedColorPicker = document.querySelector("#color-picker-card-closed");
const foundColorPicker = document.querySelector("#color-picker-card-found");
const imageSelector = document.querySelector("#image-selector");
const changeEmailButton = document.querySelector("#change-email-button")

function init() {
    closedColorPicker.value = "#FFFFFF";
    foundColorPicker.value = "#FFFFFF";
    fetch(`http://localhost:8000/api/player/${id}/preferences`, {
        method: "get",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
    }).then((result) => {
        return result.json()
    }).then((r) => {
        console.log(r);
        if(r.color_closed !== "") closedColorPicker.value = r.color_closed;
        if(r.color_found !== "") foundColorPicker.value = r.color_found;
        if(r.preferred_api !== "") imageSelector.value = r.preferred_api;
    });
}

function setSettings() {
    const data = {
        id: id,
        color_closed: closedColorPicker.value,
        color_found: foundColorPicker.value,
        api: imageSelector.value,
    }
    fetch(`http://localhost:8000/api/player/${id}/preferences`, {
        method: "post",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data),
    }).then((response) => {
        console.log(response);
        // window.location.replace("/memory");
    })
}

function changeEmail() {
    
}

saveButton.addEventListener("click", setSettings);
changeEmailButton.addEventListener("click", changeEmail)

init();