//TODO: keep track of if user is logged in or not (aka. for scoreboard/history display guest#123 if user hasn't logged in)
//TODO: store measurement type and object pair
//TODO: Diplay placeholder conversion result

let errorMsgDisplayed = false;

async function convert(event) {
    // Disable buttons/links while conversion is processing
    disablePage();

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
            username: localStorage.getItem("userName"),
            date: conversionDate,
            objectOne: objectOne,
            objectTwo: objectTwo,
            measurementType: selectedMeasurement,
            result: result
        };
        displayResult(result);
        saveConversion(conversion_info);
    } catch {
        // If there was an error, display error message
        displayResult("Sorry, an error occurred while servicing request. Please try again later.");
    }
}

async function saveConversion(conversion_info) {
    // Try saving the conversion to database
    const request = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(conversion_info)
    }
 
    try {
        const response = await fetch('/api/store_conversion', request);
        const result = await response.json();
        const name = localStorage.getItem("userName") + "_history";
        localStorage.setItem(name, history.body);

        // Retrieve list of object pairs and objects
        const obj = await fetch('/api/getObjects');
        const objects = await obj.json();

        const pr = await fetch('/api/getPairs');
        const pairs = await pr.json();

        // Check if the search included a new object pair or new objects
        addNewObjectPair(conversion_info.objectOne, conversion_info.objectTwo, pairs);
        addNewObject(conversion_info.objectOne, objects);

        const obj2 = await fetch('/api/getObjects');
        const objects2 = await obj2.json();

        addNewObject(conversion_info.objectTwo, objects2);
    } catch {
        // If we encounter an error, store everything locally
        // Check local storage and add new conversion to user history
        const history = localStorage.getItem("userName") + "_history";
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

async function addNewObjectPair(objectOne, objectTwo, pairs) {
    const finder = localStorage.getItem("userName");

    let uniquePairs = pairs;
    // let uniquePairs = localStorage.getItem(finder + "_pairs");
    let newPair = {
        "object_one": objectOne,
        "object_two": objectTwo
    }

    let pairFound = false;
    if (uniquePairs) {
        uniquePairs = JSON.parse(uniquePairs.body);

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
            //localStorage.setItem(finder + "_pairs", uniquePairs);
        }
    }
    else {
        let pairs = [newPair];
        pairs = JSON.stringify(pairs);
        //localStorage.setItem(finder + "_pairs", pairs);
    }

    if (!pairFound) {
        // Add pair to database
        try {
            const request = {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newPair)
            }

            const result = await fetch('/api/store_pair', request);
        } catch {
            console.log("Error while adding new pair to database.");
        }
    }
}

async function addNewObject(object, objects) {
    const finder = localStorage.getItem("userName");
    let objectList = objects.body;
    let objectFound = false;
    const objs = {
        object: object
    };

    if (objectList) {
        objectList = JSON.parse(objectList);
        for (let obj in objectList) {
            obj = objectList[obj].object;
            if (obj === object) {
                objectFound = true;
            }
        }

        if (!objectFound) {
            objectList.push(object);
            objectList = JSON.stringify(objectList);
            //localStorage.setItem(finder + "_objects", objectList);
        }
    }
    else {
        let objects = [object]
        objects = JSON.stringify(objects);
        //localStorage.setItem(finder + "_objects", objects);
    }

    if (!objectFound) {
        // Add object to database
        try {
            const request = {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(objs)
            }

            const result = await fetch('/api/store_object', request);
        } catch {
            console.log("Error while adding new ojbect to database.");
        }
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

function disablePage() {
    // Best way to implement?
}

function logout() {
    localStorage.removeItem('userName');
    fetch('/api/auth/logout', {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}