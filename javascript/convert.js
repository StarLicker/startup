//TODO: keep track of if user is logged in or not (aka. for scoreboard/history display guest#123 if user hasn't logged in)
//TODO: store measurement type and object pair
//TODO: Diplay placeholder conversion result

function convert() {
    // Determine which radio button measurement option has been selected
    const selectedMeasurement = document.querySelector("input.measurementType:checked").value;
    localStorage.setItem("measurementType", selectedMeasurement);

    // Store what objects the user entered
    const objectOne = document.querySelector("#object_one");
    const objectTwo = document.querySelector("#object_two");
    localStorage.setItem("objectOne", objectOne.value);
    localStorage.setItem("objectTwo", objectTwo.value);

    // Get conversion result and current date
    const result = getResult(objectOne, objectTwo);
    const conversionDate = getDate();

    // save conversion to history
    const conversion = {
        date: conversionDate,
        objectOne: objectOne.value,
        objectTwo: objectTwo.value,
        measurementType: selectedMeasurement,
        result: result
    };

    // Check local storage and add new conversion to user history
    const history = localStorage.getItem("username") + "_history";
    let userHistory = localStorage.getItem(history);

    if (userHistory !== null) {
        // Add new conversion to history and save to local storage
        userHistory = JSON.parse(userHistory);
        userHistory.push(conversion);

        userHistory = JSON.stringify(userHistory);
        localStorage.setItem(history, userHistory);
    }
    else {
        // Create user history and save it to local storage
        let user_history = [conversion];

        user_history = JSON.stringify(user_history);
        localStorage.setItem(history, user_history);
    }
}

function getResult(objectOne, objectTwo) {
    // Haven't connected to ChatGPT with node.js yet, so just use a placeholder result
    const result = "You input '" + objectOne.value + "' and '" + objectTwo.value + 
        "'. Conversion service still not online, please check again later.";

    displayResult(result);

    return result;
}

function displayResult(result) {
    let display = document.querySelector("#result_field");
    display.textContent = result;
}

function getDate() {
    const currentdate = new Date(); 
    const datetime = (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

// function to add object pair to localStorage so we can keep track of scoreboard stats
function addObjectPair() {

}

// function to add the conversion to localStorage so we can display user history
function addConversion() {

}