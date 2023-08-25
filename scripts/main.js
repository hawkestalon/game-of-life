function getContext(id) {
    const canvas = document.getElementById(id);
    return canvas.getContext("2d");
}

let arrayState = buildArray(100);

function executionLoop(time) {
    // get new array from previous array
    // render new array
    requestAnimationFrame(executionLoop);
}

function startExecution() {
    executionLoop(0);
}

function buildArray(size) {
    const newArray = [];
    for(let i = 0; i < size; i++) {
        const row = [];
        for(let j = 0; j < size; j++) {
            row.push(Math.round(Math.random()));
        }
        newArray.push(row);
    }
    return newArray;
}

function getNextState(currentArrayState) {
    for(let i = 0; i < currentArrayState.length; i++) {
        for(let j = 0; j < currentArrayState.length; j++) {
            // get number of neighbors
        }
    }
}

function getNumberOfNeighbors(x, y, arr) {
    let neighbors = 0;
    for (let i = 1; i<=3; i++) {
        for (let j = 1; j<=3; j++) {
            let xCoord = (x + i) % 3;
            let yCoord = (y + i) % 3;
        }
    }
}

