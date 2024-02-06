async function randomizeButton() {
    // let listOfGames = ["red", "blue", "yellow"];
    let listOfGames = [];
    if(document.querySelector("#gen1Check").checked === true) {
        listOfGames = listOfGames.concat(["red", "blue", "yellow"]);
    }
    if(document.querySelector("#gen2Check").checked === true) {
        listOfGames = listOfGames.concat(["gold", "silver", "crystal"]);
    }

    if(listOfGames.length == 0) {
        document.getElementById("errorText").textContent = "You need to select at least one generation";
        return;
    } else {
        document.getElementById("errorText").textContent = "";
    }

    let randomGame = listOfGames[getRandomInt(0, listOfGames.length)];
    document.getElementById("game").textContent = "The game is Pokemon " + randomGame;

    let pokes = await fetch(`content/${randomGame}.txt`).then(response => response.text());
    pokes = pokes.split(/\r?\n|\r/);
    for (let i = 1; i <= 6; i++) {
        document.getElementById("poke" + i).textContent = "Party Pokemon #" + i + " " + pokes[getRandomInt(0, pokes.length)];
    }
    document.getElementById("teamHeader").textContent = "Your team should be made up of the following pokemon:"
    
    let starterPokes = await fetch(`content/${randomGame}_starter.txt`).then(response => response.text());
    starterPokes = starterPokes.split(/\r?\n|\r/);
    let randomStarter = starterPokes[getRandomInt(0, starterPokes.length)];
    document.getElementById("starter").textContent = "Pick the starter: " + randomStarter;


}

// add a checkbox for each gen that defaults to checked, then check each one and if its checked add its games to listOfGamesa

// get a random integer between min(included) and max(excluded)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}