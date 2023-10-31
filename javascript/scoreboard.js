function displayObjectsBoard() {
    let data = [];

    for (let user in users) {
        user = users[user];

        let numObjects = localStorage.getItem(user + "_objects");
        if (numObjects) {
            numObjects = JSON.parse(numObjects);
            numObjects = numObjects.length;
    
            const userData = [user, numObjects];
            data.push(userData);
        }
    }

    const tableBody = document.querySelector('#obj_scoreboard');

    if (data.length) {
        let i = 1;
        for (let u in data) {
            u = data[u];
            const rank = document.createElement('td');
            const user = document.createElement('td');
            const num = document.createElement('td');

            rank.textContent = i;
            user.textContent = u[0];
            num.textContent = u[1];

            const row = document.createElement('tr');
            row.appendChild(rank);
            row.appendChild(user);
            row.appendChild(num);

            tableBody.appendChild(row);
            
            i++;
        }
    }
    else {
        tableBody.innerHTML = '<tr><td colspan=3>More people need to play!</td></tr>';
    }
}

function displayPairsBoard() {
    let data = [];

    for (let user in users) {
        user = users[user];

        let numPairs = localStorage.getItem(user + "_pairs");
        
        if (numPairs) {
            numPairs = JSON.parse(numPairs);
            numPairs = numPairs.length;
    
            const userData = [user, numPairs];
            data.push(userData);
        }
    }

    const tableBody = document.querySelector('#pairs_scoreboard');

    if (data.length) {
        let i = 1;
        for (let u in data) {
            u = data[u];
            const rank = document.createElement('td');
            const user = document.createElement('td');
            const num = document.createElement('td');

            rank.textContent = i;
            user.textContent = u[0];
            num.textContent = u[1];

            const row = document.createElement('tr');
            row.appendChild(rank);
            row.appendChild(user);
            row.appendChild(num);

            tableBody.appendChild(row);
            
            i++;
        }
    }
    else {
        tableBody.innerHTML = '<tr><td colspan=3>More people need to play!</td></tr>';
    }
}

let users = localStorage.getItem("users");
users = JSON.parse(users);
displayObjectsBoard();
displayPairsBoard();