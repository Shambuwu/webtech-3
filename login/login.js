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
            localStorage.setItem("token", result.token);
            setLocalUserId(data.get("username")).then(() => {
                window.location.replace("/");
            });
        })
}

// Omdat er geen manier is om de user ID van de back-end te halen wordt er gelooped door alle users.
// Als de name van de user gelijkstaat aan de username waarmee ingelogd is, store de ID van deze user dan in de localStorage.
// Er wordt op de back-end ook niet gecontroleerd op duplicate usernames en emailadressen, dus dit pakt altijd de eerste user met dezelfde username.

async function setLocalUserId(name) {
    let index = 1;
    let found = false;
    while (found === false) {
        await fetch(`http://localhost:8000/api/player/${index}`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
        }).then((result) => {
            return result.json()
        }).then((r) => {
            if (name === r.name.trim()) {
                found = true;
                localStorage.setItem("id", r.id);
            }
        });
        index++;
    }
}

form.addEventListener("submit", f => {
    f.preventDefault();
    postForm()
})