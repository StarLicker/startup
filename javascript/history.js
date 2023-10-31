function updateStats() {
    let uniqueObjects = document.querySelector("#unique_obj");
    let uniquePairs = document.querySelector("#unique_pairs");
    let totalConversions = document.querySelector("#total_conversions");

    let numObjects = localStorage.getItem("objects");
    numObjects = JSON.parse(numObjects);
    numObjects = numObjects.length;

    let numPairs = localStorage.getItem("pairs");
    numPairs = JSON.parse(numPairs);
    numPairs = numPairs.length;

    const history = localStorage.getItem("username") + "_history";
    let numConversions = localStorage.getItem(history);
    numConversions = JSON.parse(numConversions);
    numConversions = numConversions.length;

    uniqueObjects.textContent = numObjects;
    uniquePairs.textContent = numPairs;
    totalConversions.textContent = numConversions;
}

function updateHistory() {
    let historyTable = [];
    const userHistory = localStorage.getItem("username") + "_history";
    let history = localStorage.getItem(userHistory);
    if (history) {
        historyTable = JSON.parse(history);
        historyTable.reverse();
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

updateStats();
updateHistory();