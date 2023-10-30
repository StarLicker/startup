function signUp() {
    // Get username
    const username = document.querySelector("#username");

    // Get passwords and make sure they match
    const password = document.querySelector("#password");
    const repeat_password = document.querySelector("#repeat_password");

    // If sign up data is good, log the user in and send them to convert page
    if ((password.value === repeat_password.value) == true) {
        localStorage.setItem("username", username.value);
        localStorage.setItem(username.value, password.value);
        window.location.href = "convert.html";
    }
    // Otherwise, we tell user that passwords don't match
    else {
        const template = document.getElementById('errorMSG_template');
        const location = document.getElementById('first_error_location');
        displayErrorMessage(template, location);
    }
}

function login() {
    // Get username and password
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    // Check if input matches a user
    const checkStorage = localStorage.getItem(username.value);
    
    if (checkStorage === password.value) {
        window.location.href = "convert.html";
    }
    else {
        const template = document.getElementById('errorMSG_template');
        const location = document.getElementById('login_error_location');
        displayErrorMessage(template, location);
    }
}

function displayErrorMessage(template, location) {
    const errorMSG = template.cloneNode(true);
    errorMSG.textContent = "Passwords don't match";
    errorMSG.style.color = "red";
    errorMSG.style.position = "relative";
    errorMSG.style.fontSize = "15px";
    location.appendChild(errorMSG);
}