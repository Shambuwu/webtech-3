const form = document.querySelector("form");

function postForm() {
    const data = new FormData(form);
    const submitData = {
        username: data.get("username"),
        password: data.get("password"),
    }

    console.log(JSON.stringify(submitData));

    fetch("http://localhost:8000/api/login_check", {
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong.");
            }
        })
        .then((result) => {
            localStorage.setItem("token", "Bearer " + result.token);
            window.location.replace("http://localhost");
        })
}

form.addEventListener("submit", f => {
    f.preventDefault();
    postForm()
})