function getContext(id) {
    const canvas = document.getElementById(id);
    return canvas.getContext("2d");
}
console.log('Loaded File');
//let arrayState = buildArray(10);
let arrayState = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
console.log(arrayState);
let executionCounter = 0;
async function executionLoop(time) {
    const nextState = getNextState(arrayState);  
    renderArrayOnCanvas(nextState);
    console.log('Next -> ', nextState);
    executionCounter++;
    await sleep(3000);
    if (executionCounter <= 0) requestAnimationFrame(executionLoop);
}

async function startExecution() {
    console.log('Starting Execution');
    renderArrayOnCanvas(arrayState);
    await sleep(3000);
    executionLoop(0);
}

function buildArray(size) {
    const newArray = [];
    for(let i = 0; i < size; i++) {
        const row = [];
        let flip = 0;
        console.log('flipping again');
        for(let j = 0; j < size; j++) {
          console.log(flip)
          if(flip % 2 == 0) {
            row.push(1);
          } else {
            row.push(0);
          }
          flip++;
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
            const numberOfNeighbors = getNumberOfNeighbors(j, i, currentArrayState);
            const newValue = getNextValue(currentArrayState[j][i], numberOfNeighbors);
            console.log('Cell: ', j, i, currentArrayState[j][i], numberOfNeighbors, newValue);
            row.push(newValue);
        }
        newArray.push(row);
    }
    return newArray;
}

function getNumberOfNeighbors(x, y, arr) {
    let neighbors = 0;
    for (let i = 1; i<=3; i++) {
        for (let j = 1; j<=3; j++) {
            const xCoord = (x + j) % 3;
            const yCoord = (y + i) % 3;
            if (xCoord < 0 || xCoord >= arr.length) continue;
            if (xCoord == x && yCoord == y) continue;
            if (arr[xCoord][yCoord] === 1) neighbors++;
        }
    }
    return neighbors;
}

function getNextValue(value, numberOfNeighbors) {
    if (value === 0 && numberOfNeighbors === 3) return 1;
    if (numberOfNeighbors === 2 || numberOfNeighbors === 3) return 1;
    return 0;
}

function renderArrayOnCanvas(arr) {
    const ctx = getContext('canvas');
    for(let i = 0; i < arr.length; i++) {
        //console.log('Rendering Row');
        for(let j = 0; j < arr.length; j++) {
          if (arr[j][i] === 1) ctx.fillRect(i * 20,j * 20,15,15);
        }
    }
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}


