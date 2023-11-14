//TODO: keep track of if user is logged in or not (aka. for scoreboard/history display guest#123 if user hasn't logged in)
//TODO: store measurement type and object pair
//TODO: Diplay placeholder conversion result

let errorMsgDisplayed = false;

async function convert(event) {
    // Prevents default values from replacing new ones after form submission
    event.preventDefault();

    // Determine which radio button measurement option has been selected
    const selectedMeasurement = document.querySelector("input.measurementType:checked").value;
    localStorage.setItem("measurementType", selectedMeasurement);

    // Store what objects the user entered
    const o1 = document.querySelector("#object_one");
    const o2 = document.querySelector("#object_two");

    const objectOne = o1.value.trim();
    const objectTwo = o2.value.trim();

    // Check if objects are valid
    // if (objectOne === "" || objectTwo === "") {
    //     // Display error message
    //     const template = document.getElementById('error_msg');
    //     const location = document.getElementById('error_location');
    //     displayErrorMessage(template, location, "Please fill object one and two fields with valid objects");
    //     errorMsgDisplayed = true;
    // }
    // errorMsgDisplayed = false;

    const req = {
        obj1: objectOne,
        obj2: objectTwo,
        type: selectedMeasurement
    };

    try {
        // Make conversion using openai API and recieve response

        const request = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req)
        }

        const response = await fetch('/api/convert', request);

        const conversion = await response.json();

        localStorage.setItem("objectOne", objectOne);
        localStorage.setItem("objectTwo", objectTwo);

        // Get conversion result and current date
        //const result = getResult(objectOne, objectTwo);
        const result = conversion.body;
        const conversionDate = getDate();

        // save conversion to history
        const conversion_info = {
            date: conversionDate,
            objectOne: objectOne,
            objectTwo: objectTwo,
            measurementType: selectedMeasurement,
            result: result
        };

        // Check local storage and add new conversion to user history
        const history = localStorage.getItem("username") + "_history";
        let userHistory = localStorage.getItem(history);

        if (userHistory !== null) {
            // Add new conversion to history and save to local storage
            userHistory = JSON.parse(userHistory);
            userHistory.push(conversion_info);

            userHistory = JSON.stringify(userHistory);
            localStorage.setItem(history, userHistory);
        }
        else {
            // Create user history and save it to local storage
            let user_history = [conversion_info];

            user_history = JSON.stringify(user_history);
            localStorage.setItem(history, user_history);
        }

        // Check if the search included a new object pair or new objects
        addNewObjectPair(objectOne, objectTwo);
        addNewObject(objectOne);
        addNewObject(objectTwo);
        displayResult(result);
    } catch {
        // If there was an error, display error message
        displayResult("Sorry, an error occurred while servicing request. Please try again later.");
    }
}

function getResult(objectOne, objectTwo) {
    // Haven't connected to ChatGPT with node.js yet, so just use a placeholder result
    const result = "You input '" + objectOne + "' and '" + objectTwo + 
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

function addNewObjectPair(objectOne, objectTwo) {
    const finder = localStorage.getItem("username");
    let uniquePairs = localStorage.getItem(finder + "_pairs");
    let newPair = {
        "object_one": objectOne,
        "object_two": objectTwo
    }

    let pairFound = false;
    if (uniquePairs) {
        uniquePairs = JSON.parse(uniquePairs);

        for (let pair in uniquePairs) {
            pair = uniquePairs[pair];
            const one = pair.object_one;
            const two = pair.object_two;
            // If pair is unique, add it
            if ( (one === objectOne) && (two === objectTwo) ) {
                pairFound = true;
            }
        }
        
        if (!pairFound) {
            uniquePairs.push(newPair);
            uniquePairs = JSON.stringify(uniquePairs);
            localStorage.setItem(finder + "_pairs", uniquePairs);
        }
    }
    else {
        let pairs = [newPair];
        pairs = JSON.stringify(pairs);
        localStorage.setItem(finder + "_pairs", pairs);
    }
}

function addNewObject(object) {
    const finder = localStorage.getItem("username");
    let objectList = localStorage.getItem(finder + "_objects");

    if (objectList) {
        let objectFound = false;
        objectList = JSON.parse(objectList);
        for (let obj in objectList) {
            obj = objectList[obj];
            if (obj === object) {
                objectFound = true;
            }
        }

        if (!objectFound) {
            objectList.push(object);
            objectList = JSON.stringify(objectList);
            localStorage.setItem(finder + "_objects", objectList);
        }
    }
    else {
        let objects = [object]
        objects = JSON.stringify(objects);
        localStorage.setItem(finder + "_objects", objects);
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