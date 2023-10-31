//TODO: keep track of if user is logged in or not (aka. for scoreboard/history display guest#123 if user hasn't logged in)
//TODO: store measurement type and object pair
//TODO: Diplay placeholder conversion result

function convert(event) {
    // Prevents default values from replacing new ones after form submission
    event.preventDefault();

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

    // Check if the search included a new object pair or new objects
    addNewObjectPair(objectOne, objectTwo);
    addNewObject(objectOne);
    addNewObject(objectTwo);
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

function addNewObjectPair(objectOne, objectTwo) {
    let uniquePairs = localStorage.getItem("pairs");
    let newPair = {
        "object_one": objectOne.value,
        "object_two": objectTwo.value
    }

    let pairFound = false;
    if (uniquePairs) {
        uniquePairs = JSON.parse(uniquePairs);

        for (let pair in uniquePairs) {
            pair = uniquePairs[pair];
            const one = pair.object_one;
            const two = pair.object_two;
            // If pair is unique, add it
            if ( (one === objectOne.value) && (two === objectTwo.value) ) {
                pairFound = true;
            }
        }
        
        if (!pairFound) {
            uniquePairs.push(newPair);
            uniquePairs = JSON.stringify(uniquePairs);
            localStorage.setItem("pairs", uniquePairs);
        }
    }
    else {
        let pairs = [newPair];
        pairs = JSON.stringify(pairs);
        localStorage.setItem("pairs", pairs);
    }
}

function addNewObject(object) {
    let objectList = localStorage.getItem("objects");

    if (objectList) {
        let objectFound = false;
        objectList = JSON.parse(objectList);
        for (let obj in objectList) {
            obj = objectList[obj];
            if (obj === object.value) {
                objectFound = true;
            }
        }

        if (!objectFound) {
            objectList.push(object.value);
            objectList = JSON.stringify(objectList);
            localStorage.setItem("objects", objectList);
        }
    }
    else {
        let objects = [object.value]
        objects = JSON.stringify(objects);
        localStorage.setItem("objects", objects);
    }
}