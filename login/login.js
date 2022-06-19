const form = document.querySelector("form");

function postForm() {
    const data = new FormData(form);
    const submitData = {
        username: data.get("username"),
        password: data.get("password"),
    }

    console.log(JSON.stringify(submitData));

    fetch("http://localhost:8000/api/login_check", {method:"post", body: JSON.stringify(submitData)})
        .then((response) => {
            if (response.ok) {
                console.log(response);
                //location.reload();
            } else {
                throw new Error("Something went wrong.");
            }
        })
}

form.addEventListener("submit", f => {
    f.preventDefault();
    postForm()
})