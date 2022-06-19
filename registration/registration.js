const form = document.querySelector("form");

function postForm() {
    const data = new FormData(form);
    const submitData = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
    }
    fetch("http://localhost:8000/register", {method:"post", body: JSON.stringify(submitData)})
        .then((response) => {
            if (response.ok) {
                console.log(response);
                location.reload();
            } else {
                throw new Error("Something went wrong.");
            }
        })
}

form.addEventListener("submit", f => {
    f.preventDefault();
    postForm()
})