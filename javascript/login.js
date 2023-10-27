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
        const errorMSG = document.createElement('div');
        errorMSG.textContent = "Passwords don't match";
    }
}

function login() {
    window.location.href = "convert.html";
}