async function updateStats() {
    let uniqueObjects = document.querySelector("#unique_obj");
    let uniquePairs = document.querySelector("#unique_pairs");
    let totalConversions = document.querySelector("#total_conversions");

    try {
        // Get stats from database
        const request = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username: user})
        }

        const result = await fetch("/api/getStats", request);
        let stats = await result.json();
        let full_stats = await JSON.parse(stats.body);

        uniqueObjects.textContent = full_stats.stats.unique_objects;
        uniquePairs.textContent = full_stats.stats.unique_pairs;
        totalConversions.textContent = full_stats.stats.num_conversions;

    } catch {
        uniqueObjects.textContent = "...";
        uniquePairs.textContent = "...";
        totalConversions.textContent = "...";
    }

    // let uniqueObjects = document.querySelector("#unique_obj");
    // let uniquePairs = document.querySelector("#unique_pairs");
    // let totalConversions = document.querySelector("#total_conversions");

    // let numObjects = localStorage.getItem(user + "_objects");
    // numObjects = JSON.parse(numObjects);
    // try {
    //     numObjects = numObjects.length;
    // } catch {
    //     numObjects = 0;
    // }

    // let numPairs = localStorage.getItem(user + "_pairs");
    // numPairs = JSON.parse(numPairs);
    // try {
    //     numPairs = numPairs.length;
    // } catch {
    //     numPairs = 0;
    // }

    // const history = localStorage.getItem("username") + "_history";
    // let numConversions = localStorage.getItem(history);
    // numConversions = JSON.parse(numConversions);
    // try {
    //     numConversions = numConversions.length;
    // } catch {
    //     numConversions = 0;
    // }
}

async function updateHistory() {
    let historyTable = [];
    let history = "";

    const name = {
        username: localStorage.getItem("username")
    }
    const request = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(name)
    }

    try {
        const response = await fetch("/api/history", request);
        const convert = await response.json();
        history = convert.body;
        historyTable = JSON.parse(history);
        
        if (historyTable) {
            historyTable.reverse();
        }
    } catch {
        const userHistory = localStorage.getItem("username") + "_history";
        history = localStorage.getItem(userHistory);
        
        if (history) {
            historyTable = JSON.parse(history);
            historyTable.reverse();
        }
    }

    const tableBody = document.querySelector("#history");

    if (historyTable.length) {
        for (let conversion in historyTable) {
            conversion = historyTable[conversion];
            const date = document.createElement('td');
            const firstObj = document.createElement('td');
            const secondObj = document.createElement('td');
            const type = document.createElement('td');
            const result = document.createElement('td');

            date.textContent = conversion.date;
            firstObj.textContent = conversion.objectOne;
            secondObj.textContent = conversion.objectTwo;
            type.textContent = conversion.measurementType;
            result.textContent = conversion.result;

            const tableRow = document.createElement('tr');
            tableRow.appendChild(date);
            tableRow.appendChild(firstObj);
            tableRow.appendChild(secondObj);
            tableRow.appendChild(type);
            tableRow.appendChild(result);

            tableBody.appendChild(tableRow);
        }
    }
    else {
        tableBody.innerHTML = '<tr class="history_row"<td class="history_data" colSpan=5>No conversion made yet</td></tr>';
    }
}

let user = localStorage.getItem("username");
updateStats();
updateHistory();