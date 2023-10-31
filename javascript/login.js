// Keep track if an error message has been displayed for sign in/log in
let msgDisplayed = false;

function signUp() {
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
            addUser(username.value);
            localStorage.setItem("username", username.value);
            localStorage.setItem(username.value, password.value);
            window.location.href = "convert.html";
            msgDisplayed = false;
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