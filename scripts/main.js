function getContext(id) {
    const canvas = document.getElementById(id);
    return canvas.getContext("2d");
}
console.log('Loaded File');
let arrayState = buildArray(100);

function executionLoop(time) {
    // get new array from previous array
    const nextState = getNextState(arrayState);
    console.log('Next -> ', nextState);
    // render new array
    requestAnimationFrame(executionLoop);
}

function startExecution() {
    console.log('Starting Execution');
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
    let newArray = [];
    for(let i = 0; i < currentArrayState.length; i++) {
        let row = [];
        for(let j = 0; j < currentArrayState.length; j++) {
            const numberOfNeighbors = getNumberOfNeighbors(i, j, currentArrayState);
            row.push(currentArrayState[i][j], numberOfNeighbors);
        }
        newArray.push(row);
    }
    return newArray;
}

function getNumberOfNeighbors(x, y, arr) {
    let neighbors = 0;
    for (let i = 1; i<=3; i++) {
        for (let j = 1; j<=3; j++) {
            const xCoord = (x + i) % 3;
            const yCoord = (y + i) % 3;
            if (xCoord < 0 || xCoord >= arr.length) continue;
            if (xCoord == x && yCoord == y) continue;
            if (arr[xCoord][yCoord]) neighbors++;
        }
    }
    return neighbors;
}

function getNextValue(value, numberOfNeighbors) {
    if (value === 0 && numberOfNeighbors === 3) return 1;
    if (numberOfNeighbors === 2 || numberOfNeighbors === 3) return 1;
    return 0;
}

