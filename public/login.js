// function to check if user is authorized
(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        window.location.href = 'convert.html';
    }
})();


// Keep track if an error message has been displayed for sign in/log in
let msgDisplayed = false;

async function logOrSignUp(loc, username, password, endpoint) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({ username: username, password: password })
    });

    if (response.ok) {
        localStorage.setItem('userName', username);
        window.location.href = 'convert.html';
    } else {
        const template = document.getElementById('errorMSG_template');
        const location = null;
        if (loc === "signup") {
            location = document.getElementById('first_error_location');
        } else {
            location = document.getElementById('login_error_location');
        }
        displayErrorMessage(template, location, "Problem while trying to sign up or log in, please try again!");
        msgDisplayed = true;
    }
}

async function signUp() {
    // Get username
    const username = document.querySelector("#username");

    // Get passwords and make sure they match
    const password = document.querySelector("#password");
    const repeat_password = document.querySelector("#repeat_password");

    if (username.value === "" || password.value === "") {
        const template = document.getElementById('errorMSG_template');
        const location = document.getElementById('first_error_location');
        displayErrorMessage(template, location, "Must fill out username and password fields");
        msgDisplayed = true;
    }
    else {
        // If sign up data is good, log the user in and send them to convert page
        if ((password.value === repeat_password.value) == true) {

            // const request = {
            //     method: 'POST',
            //     headers: {'content-type': 'application/json'},
            //     body: JSON.stringify(user = {
            //         username: username.value
            //     })
            // };

            // const response = await fetch("/api/createStats", request);
            // const result = await response.json();

            logOrSignUp("signup", username, password, '/api/auth/signUp');
        }
        // Otherwise, we tell user that passwords don't match
        else {
            const template = document.getElementById('errorMSG_template');
            const location = document.getElementById('first_error_location');
            displayErrorMessage(template, location, "Passwords don't match");
            msgDisplayed = true;
        }
    }
}

function login() {
    // Get username and password
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    // Check if input matches a user
    const checkStorage = localStorage.getItem(username.value);
    
    if (checkStorage === password.value) {
        localStorage.setItem("username", username.value);
        window.location.href = "convert.html";
        msgDisplayed = false;
    }
    else {
        const template = document.getElementById('errorMSG_template');
        const location = document.getElementById('login_error_location');
        displayErrorMessage(template, location, "Username and/or password is incorrect");
        msgDisplayed = true;
    }
}

function displayErrorMessage(template, location, message) {
    // Check if an error message has already been displayed
    if (!msgDisplayed) {
        const errorMSG = template.cloneNode(true);
        errorMSG.textContent = message;
        errorMSG.style.color = "red";
        errorMSG.style.position = "relative";
        errorMSG.style.fontSize = "15px";
        location.appendChild(errorMSG);
    }
}

function addUser(newUser) {
    let users = localStorage.getItem("users");

    if (users) {
        users = JSON.parse(users);
        users.push(newUser);
        users = JSON.stringify(users);
        localStorage.setItem("users", users);
    }
    else {
        users = [newUser];
        users = JSON.stringify(users);
        localStorage.setItem("users", users);
    }
}