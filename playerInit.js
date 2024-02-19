window.onload = function () {
    
    let CONTESTANT_INFO = {
        "total": 15,
        "player" : {
            "name": "",
            "age": 0,
            "charm": 0,
            "isNPC": false,
            "hasRose": false
        },
        "contestants" : [
            {
                "name": "Jenevieve Script",
                "age": 26,
                "charm": 0, 
                "isNPC": true
            }, 
            {
                "name": "Elina Barby",
                "age": 28,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Serene Poke",
                "age": 24,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Grace Mon",
                "age": 24,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Astrid Hickery",
                "age": 21,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Meihua Blossom XIII",
                "age": 29,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Retsuko Sanrio",
                "age": 47,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Noah Peacherson",
                "age": 36,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Zeke Lelda",
                "age": 35,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Neil Anamai",
                "age": 31,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Alphonse Dente",
                "age": 28,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Mapo Futo",
                "age": 38,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Thomas Nookington",
                "age": 21,
                "charm": 0, 
                "isNPC": true
            },
            {
                "name": "Ferdinand von Aegir",
                "age": 23,
                "charm": 0, 
                "isNPC": true
            }
        ]
    }
    
    localStorage.clear();
    gameInit();

    // Prompts uper to input name
    document.getElementById("howToButton").addEventListener("click", () => {
        window.location.href = "./howToPlay.html";
    });
    document.getElementById("meetNPCs").addEventListener("click", () => {
        window.location.href = "./npcBios.html";
    });
    document.getElementById("playerInitFormButton").addEventListener("click", playerInit);

    // Initialise the game and all the objects
    function gameInit() {
        let allContestants = CONTESTANT_INFO["contestants"];
        localStorage.setItem("remainingContestants", JSON.stringify(allContestants));
        localStorage.setItem("weekNum", 1);
        localStorage.setItem("dayNum", 1);
        localStorage.setItem("hasDated", false);
        localStorage.setItem("backFromDate", false);

        let socialTracker = {};
        for (let i = 0; i < allContestants.length; i++){
            socialTracker[allContestants[i].name] = 0;
        }
        // Jenevieve is our default socialLeader
        localStorage.setItem("socialLeader", "Jenevieve Script");
        localStorage.setItem("socialTracker", JSON.stringify(socialTracker));
    };
    
    function playerInit(e) {
        // collect the form information and create the player
        const elements = document.getElementById("playerInitForm").elements;
        let player = CONTESTANT_INFO["player"];
        player.name = elements.playerName.value;
        let whichLead = elements.bachelor.checked ? "Bachelor" : "Bachelorette";

        // set form information to local storage
        localStorage.setItem("player", JSON.stringify(player))
        localStorage.setItem("whichLead", whichLead);
        window.location.href = "./actionMenu.html";

    };

}