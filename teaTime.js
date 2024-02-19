window.onload = function () {
    let TEATIME_PROMPTS = {
        "total" : 32,
        "prompts": [
            {
                "dialogue" : "My secret talent is bowling.",
                "correct" : "Applaud",
                "incorrect" : ["Smile", "Laugh"]
            },
            {
                "dialogue" : "I've always detested rabbits.",
                "correct" : "Frown",
                "incorrect" : ["Disagree", "Fight"]
            },
            {
                "dialogue" : "Let’s play rock paper scissors.",
                "correct" : "Rock",
                "incorrect" : ["Paper", "Scissor"]
            },
            {
                "dialogue" : "Let’s play rock paper scissors.",
                "correct" : "Paper",
                "incorrect" : ["Rock", "Scissors"]
            },
            {
                "dialogue" : "Let’s play rock paper scissors.",
                "correct" : "Scissors",
                "incorrect" : ["Rock", "Paper"]
            },
            {
                "dialogue" : "I think cereal is a soup.",
                "correct" : "Disagree",
                "incorrect" : ["Nod", "Fight"]
            },
            {
                "dialogue" : "I pour the milk before the cereal.",
                "correct" : "Fight",
                "incorrect" : ["Laugh", "Applaud"]
            },
            {
                "dialogue" : "Are you really just here for more Instagram followers?",
                "correct" : "Cry",
                "incorrect" : ["Disagree", "Nod"]
            },
            {
                "dialogue" : "I like to sleep with socks on.",
                "correct" : "Sigh",
                "incorrect" : ["Smile", "Applaud"]
            },
            {
                "dialogue" : "Is Pittsburgh in Philadelphia?",
                "correct" : "Frown",
                "incorrect" : ["Disagree", "Sigh"]
            },
            {
                "dialogue" : "Would you still marry me if you knew how much I owe in student debt?",
                "correct" : "Nod",
                "incorrect" : ["Smile", "Cry"]
            },
            {
                "dialogue" : "I’ve always wanted to meet Rich Fairbank.",
                "correct" : "Frown",
                "incorrect" : ["Nod", "Sigh"]
            },
            {
                "dialogue" : "However this ends, I’m so glad to have met you.",
                "correct" : "Blush",
                "incorrect" : ["Applaud", "Smile"]
            },
            {
                "dialogue" : "I’m so comfortable around you, I can’t help but tell you everything.",
                "correct" : "Blush",
                "incorrect" : ["Laugh", "Cry"]
            },
            {
                "dialogue" : "Sometimes, I’m afraid that I will regret coming on to this show.",
                "correct" : "Nod",
                "incorrect" : ["Disagree", "Sigh"]
            },
            {
                "dialogue" : "My secret hobby is sewing and embroidery.",
                "correct" : "Applaud",
                "incorrect" : ["Smile", "Fight"]
            },
            {
                "dialogue" : "Hey, are you getting hungry?",
                "correct" : "Laugh",
                "incorrect" : ["Cry", "Frown"]
            },
            {
                "dialogue" : "I’m really craving a nap after this.",
                "correct" : "Nod",
                "incorrect" : ["Sigh", "Frown"]
            },
            {
                "dialogue" : "Sometimes, I can’t really remember my father’s face...",
                "correct" : "Cry",
                "incorrect" : ["Laugh", "Smile"]
            },
            {
                "dialogue" : "When I’m tired of seeing people I’ll just stare blankly at a wall to calm down.",
                "correct" : "Applaud",
                "incorrect" : ["Laugh", "Sigh"]
            },
            {
                "dialogue" : "I often worry about my posture.",
                "correct" : "Nod",
                "incorrect" : ["Applaud", "Frown"]
            },
            {
                "dialogue" : "At least on the show I don’t have to cook! (Just kidding I actually love cooking and this makes me sad.)",
                "correct" : "Cry",
                "incorrect" : ["Sigh", "Laugh"]
            },
            {
                "dialogue" : "Have you heard of Bluetooth? Isn’t it crazy?",
                "correct" : "Smile",
                "incorrect" : ["Sigh", "Nod"]
            },
            {
                "dialogue" : "When I feel down, I usually go on long walks. But on the show I just feel so confined...",
                "correct" : "Nod",
                "incorrect" : ["Sigh", "Cry"]
            },
            {
                "dialogue" : "You are always so calm, it’s rather comforting.",
                "correct" : "Blush",
                "incorrect" : ["Disagree", "Laugh"]
            },
            {
                "dialogue" : "When I was young I wanted to become a tailor.",
                "correct" : "Applaud",
                "incorrect" : ["Nod", "Smile"]
            },
            {
                "dialogue" : "I get seasick really easily and am terrified of riding on boats.",
                "correct" : "Cry",
                "incorrect" : ["Laugh", "Disagree"]
            },
            {
                "dialogue" : "One day if I ever become the head of a conglomerate, I promise to set all the small businesses free.",
                "correct" : "Applaud",
                "incorrect" : ["Blush", "Frown"]
            },
            {
                "dialogue" : "Is it really so bad if you’re not just here for marriage?",
                "correct" : "Sigh",
                "incorrect" : ["Praise", "Nod"]
            },
            {
                "dialogue" : "You’re such a mystery...",
                "correct" : "Disagree",
                "incorrect" : ["Praise", "Nod"]
            },
            {
                "dialogue" : "My mind keeps drifting today...",
                "correct" : "Laugh",
                "incorrect" : ["Frown", "Fight"]
            },
            {
                "dialogue" : "Your room is so neat! You should clean mine too.",
                "correct" : "Fight",
                "incorrect" : ["Disagree", "Smile"]
            }
        ]
    }

    // generate integer between 0-32 to choose prompt
    let promptIdx = Math.floor(Math.random() * TEATIME_PROMPTS["total"]);
    let teaTimePrompt = TEATIME_PROMPTS["prompts"][promptIdx];
    let dialogueSection = document.getElementById("dialogueSection");
    let dialogueElem = document.createElement('p');
    dialogueElem.className = "dialogueText";
    document.getElementById("gameBox").addEventListener("click", startDate);
    
    // print starting message
    dialogueElem.textContent = "Wow this food looks delicious! I love plain white rice! Don't worry, I'm still listening to you, I promise.";
    dialogueSection.appendChild(dialogueElem);


    function startDate (){
        dialogueElem.textContent = teaTimePrompt["dialogue"];
        document.getElementById("gameBox").removeEventListener("click", startDate);        
    
        // create array with both correct and incorrect responses and shuffle
        const buttons = teaTimePrompt["incorrect"].slice(0);
        buttons.push(teaTimePrompt["correct"]);
        shuffleArray(buttons);
    
        // print response buttons with eventListeneres
        let buttonSection = document.getElementById("buttonSection");
        for (let i = 0; i < buttons.length; i++) {
            let buttonElem = document.createElement('button');
            buttonElem.innerHTML = buttons[i];
            buttonSection.appendChild(buttonElem);
            if (buttons[i] === teaTimePrompt["correct"]) {
                buttonElem.addEventListener("click", correctResp);
            }
            else {
                buttonElem.addEventListener("click", incorrectResp);
            }
        };
    }

    // print outcome message and update player.hasRose
    function correctResp () {
        document.getElementById("dateImg").src = "./img/anna_date2.jpg";
        dialogueElem.textContent = "I really appreciate your reaction! Please accept this rose."
        let player = JSON.parse(localStorage.getItem("player"));
        player.hasRose = true;
        localStorage.setItem("player", JSON.stringify(player));
        let para = document.createElement('p');
        para.textContent = "You got a rose!";
        document.getElementById("teaTimeOutcome").appendChild(para);
        endDateButton();
    }

    // print outcome message and update player.hasRose
    function incorrectResp () {
        dialogueElem.textContent = "That wasn't really the reaction I was looking for... Sorry, but I can't give you this rose.";
        let para = document.createElement('p');
        para.textContent = "You didn't get a rose.";
        document.getElementById("teaTimeOutcome").appendChild(para);
        endDateButton();
    }

    // removes reaction buttons and creates pop-up to end the date
    function endDateButton () {
        // displaying modal with button
        setTimeout(() => {
            document.getElementById("modal").style.display = "block";
        }, 1000);
        // removing reaction button nodes
        let optionButtons = document.getElementsByTagName("button");
        while (optionButtons.length > 0) {
            optionButtons[0].parentNode.removeChild(optionButtons[0]);
        }
        // printing endDate button with outcome
        let elem = document.getElementById("teaTimeOutcome");
        let buttonElem = document.createElement('button');
        buttonElem.innerHTML = "End Date";
        elem.appendChild(buttonElem);
        buttonElem.addEventListener("click", () => { window.location.href = "./actionMenu.html"; });
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // https://bost.ocks.org/mike/shuffle/
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}