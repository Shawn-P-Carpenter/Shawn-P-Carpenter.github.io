async function randomizeButton() {
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

    let dex = await fetch(`content/dex.txt`).then(response => response.text());
    dex = dex.split(/\r?\n|\r/)
    
    let currRow = ""

    let pokes = await fetch(`content/${randomGame}.txt`).then(response => response.text());
    pokes = pokes.split(/\r?\n|\r/);
    let randomPoke = "";
    for (let i = 1; i <= 6; i++) {
        randomPoke = pokes[getRandomInt(0, pokes.length)]
        document.getElementById("poke" + i).textContent = "Party Pokemon #" + i + " " + randomPoke;
        document.getElementById("poke" + i + "Info").href = "https://bulbapedia.bulbagarden.net/wiki/" + randomPoke + "_(Pok%C3%A9mon)#Game_locations";
        document.getElementById("poke" + i + "Info").textContent = randomPoke + " Locations";
        for(let j = 0; j < dex.length; j++) {
            currRow = dex[j].split("-")
            if(currRow[0].toLowerCase() === randomPoke.toLowerCase()) {
                if(randomGame === "crystal") {
                    document.getElementById("poke" + i + "Sprite").src = "content/sprites/" + randomGame + "/" + currRow[1] + ".gif";
                } else {
                    document.getElementById("poke" + i + "Sprite").src = "content/sprites/" + randomGame + "/" + currRow[1] + ".png";
                }
                j = dex.length + 1;
            }
        }
    }
    document.getElementById("teamHeader").textContent = "Your team should be made up of the following pokemon:"
    
    let starterPokes = await fetch(`content/${randomGame}_starter.txt`).then(response => response.text());
    starterPokes = starterPokes.split(/\r?\n|\r/);
    let randomStarter = starterPokes[getRandomInt(0, starterPokes.length)];
    document.getElementById("starter").textContent = "Pick the starter: " + randomStarter;

    $(".pokeRow").css("display", "block")

}

// get a random integer between min(included) and max(excluded)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}