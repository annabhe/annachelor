window.onload = function () {

    // initializing all global variables
    const remainingContestants = JSON.parse(localStorage.getItem("remainingContestants")); 
    let player = JSON.parse(localStorage.getItem("player"));
    let weekNum = JSON.parse(localStorage.getItem("weekNum"));
    let dayNum = JSON.parse(localStorage.getItem("dayNum"));
    let hasDated = JSON.parse(localStorage.getItem("hasDated"));
    let whichLead = localStorage.getItem("whichLead");
    let dateOdds = [0.2, 0.3, 0.4, 0.5, 1, 1];
    let contestantNum = [10, 6, 4, 3, 2, 1];
    let backFromDate = JSON.parse(localStorage.getItem("backFromDate"));
    let socialTracker = JSON.parse(localStorage.getItem("socialTracker"));
    let socialLeader = localStorage.getItem("socialLeader");

    // adding event listeners to each action button
    document.getElementById("boostButton").addEventListener("click", () => { statBoost(player); });
    document.getElementById("askDateButton").addEventListener("click", askDate);
    document.getElementById("sleepButton").addEventListener("click", () => { sleep(player); });
    document.getElementById("inciteDrama").addEventListener("click", inciteDrama);
    document.getElementById("socialiseButton").addEventListener("click", pickFriend);


    // updating week and day counters 
    let weekNumNode = document.createTextNode(weekNum);
    document.getElementById("weekCounter").appendChild(weekNumNode);
    let dayNumNode = document.createTextNode(dayNum);
    document.getElementById("dayCounter").appendChild(dayNumNode);
    let charmNode = document.createTextNode(player.charm);
    document.getElementById("charmCounter").appendChild(charmNode);

    // disabling askDateButton if already gone on a date
    if (hasDated) {
        document.getElementById("askDateButton").disabled = true;
    } else {
        document.getElementById("askDateButton").disabled = false;
    }
    if (backFromDate) { 
        backFromDate = false;
        nextDay(); 
    }

    updateHeader(weekNum);
    
    // callback function if Boost is chosen action
    function statBoost(contestant) {
        boostCharm(contestant, "charm");
        if (!contestant.isNPC) {
            let charmDiff = contestant.charm - parseInt(charmNode.nodeValue);
            charmNode.nodeValue = contestant.charm;
            popUp(`Hooray! Your charm increased by ${charmDiff}!`, nextDay)
        }
    };

    // Callback for ask date action; only the player will call this function (not NPCs)
    function askDate() {
        let getDate = Math.random();
        if (getDate < dateOdds[weekNum - 1]) {
            localStorage.setItem("hasDated", true);
            localStorage.setItem("backFromDate", true);
            localStorage.setItem("dayNum", dayNum);
            localStorage.setItem("player", JSON.stringify(player))
            localStorage.setItem("socialLeader", "Jenevieve Script");
            localStorage.setItem("socialTracker", JSON.stringify(socialTracker));
            popUp(`Congrats! The ${whichLead} accepted your date!`, "teaTime")
        }
        else {
            popUp("Sorry you didn't get the date.", nextDay)
        }
    };

    // callback for sleeping
    function sleep(contestant) {
        if (!contestant.isNPC) {
            popUp("Good night!", nextDay);
        }
    };

    function pickFriend() {
        // modal appears
        let modal = document.getElementById("modal");
        modal.style.display = "block";
        // create for
        let modalContent = document.getElementById("modal-content");
        let form = document.createElement("form");
        form.id = "socialiseForm"
        modalContent.appendChild(form);
        //create label with text and append to form
        let label = document.createElement("label");
        let newText = document.createTextNode("Choose who to socialise with");
        label.appendChild(newText);
        form.appendChild(label)

        // create input elements and append to form
        for (let i = 0; i < remainingContestants.length; i++) {
            // create/append the input Element
            let inputElem = document.createElement("input");
            inputElem.type = "radio";
            inputElem.value = remainingContestants[i].name;
            inputElem.id = `choice-${remainingContestants[i].name}`;
            form.appendChild(inputElem);
            // create/append the label element
            let labelElem = document.createElement("label");
            labelElem.htmlFor = `choice-${remainingContestants[i].name}`;
            labelElem.appendChild(document.createTextNode(remainingContestants[i].name));
            form.appendChild(labelElem);
        }

        // create button box with event listeners 
        let buttonBox = document.createElement("div");
        buttonBox.id = "buttonBox";
        modalContent.appendChild(buttonBox);
        //the nevermind button
        let butt = document.createElement("button");
        butt.appendChild(document.createTextNode("Close"));
        buttonBox.appendChild(butt);
        butt.addEventListener("click", () => { 
            modal.style.display = "none"; 
            // remove when finished
            form.remove();
            buttonBox.remove();
        });
        // socialise button
        butt = document.createElement("button");
        butt.appendChild(document.createTextNode("Socialise!"));
        buttonBox.appendChild(butt);
        butt.addEventListener("click", (e) => { 
            e.stopPropagation();
             // find selected value
             const elements = document.querySelectorAll('input');
             let friend;
             for (let elem of elements) {
                 if (elem.checked) {
                     friend = remainingContestants.filter(function(el){return el.name == elem.value})[0]
                     break;
                 }
             }
             form.remove();
             buttonBox.remove();
             socialise(friend);
        });
    }

    function socialise(contestant) {
        boostCharm(contestant, "friendship");
        friendship = socialTracker[contestant.name];
        if (friendship > socialTracker[socialLeader]) {
            socialLeader = contestant.name;
        }
        if (friendship > 15) {
            popUp(`${contestant.name} says: Hey ${player.name}, I know we haven't known each other for that long but we haven't known the main lead for long either. We both came here to find love and I think I've found it with you! Will you marry me instead?`, "secretEnd")
        }
        // no secret ending; continue as usual
        else {
            popUp(`Your relationship with ${contestant.name} increased!`, nextDay);
        }

    }

    // callback for inciting drama
    function inciteDrama() {
        let drama = Math.random();
        if (drama < 0.3) {
            player.charm -= 4;
            popUp("Uh oh! Your drama cost you 4 charm.", nextDay)
        } else if (drama < 0.8) {
            for (let i = 0; i < remainingContestants.length; i++) {
                remainingContestants[i].charm -= 2;
            }
            popUp("Wow! Your drama caused every one else's charm to fall by 2.", nextDay);
        } else {
            popUp("Your drama went unnoticed.", nextDay);
        }
    }

    // boosting the charm stat of player and npc alike
    function boostCharm(contestant, statType) {
        let boostVal = 4; // consider moving this to be a global variable and less of a magic number
        let boostOdds = Math.random();

        // 0.5x multiplier (Bad)
        if (boostOdds < 0.1) {
            boostVal *= 0.5;
        // no mulitplier (Good)
        } else if (boostOdds < 0.5) {
            boostVal;
        // 1.5x multiplier (Great)
        } else if (boostOdds < 0.8) {
            boostVal *= 1.5;
        // 2.0x mulitplier (Perfect)
        } else {
            boostVal *= 2;
        }

        if (statType === "charm") {
            contestant.charm += boostVal;
        } else {
            socialTracker[contestant.name] += boostVal;
        }
    };

    // updates variables and increments the day
    function nextDay() {
        document.getElementById("modal").style.display = "none";
        npcAction();
        if (dayNum === 3) {
            localStorage.setItem("contestantsToKeep", contestantNum[weekNum - 1]);
            localStorage.setItem("player", JSON.stringify(player))
            localStorage.setItem("remainingContestants", JSON.stringify(remainingContestants));
            localStorage.setItem("socialLeader", "Jenevieve Script");
            localStorage.setItem("socialTracker", JSON.stringify(socialTracker));
            window.location.href = "./roseCeremony.html";
        } else {
            dayNum++;
            dayNumNode.nodeValue = dayNum;
        }

        // enforcing date button during last two weeks
        // will not overlap with previous condition because dayNum has been updated in between
        if (!hasDated && weekNum > 4 && dayNum === 3) {
            document.getElementById("boostButton").disabled = true;
            document.getElementById("sleepButton").disabled = true;
            document.getElementById('inciteDrama').disabled = true;
            document.getElementById('socialiseButton').disabled = true;
        }
        updateHeader(weekNum);
    };

    // allow NPCs to run their action
    function npcAction() {
        for (let i = 0; i < remainingContestants.length; i++) {
            let npcOdds = Math.random();
            if (npcOdds < 0.4) {
                boostCharm(remainingContestants[i], "charm");
            } else {
                sleep(remainingContestants[i]);
            }
        }
    };

    // modal pops up and redirects to teaTime or to nextDay
    function popUp(text, redirect) {
        let modal = document.getElementById("modal");
        let modalContent = document.getElementById("modal-content");
        let popUpMsg = document.getElementById('popUpMsg');
        popUpMsg.textContent = text;
        modal.style.display = "block";

        let continueButton = document.createElement("button");
        continueButton.appendChild(document.createTextNode("Continue"));

        if (redirect === nextDay) {
            modalContent.appendChild(continueButton);
            continueButton.addEventListener("click", (e) => {
                e.preventDefault();
                nextDay();
                continueButton.remove();
            });
        } else if (redirect === "teaTime") {
            modalContent.appendChild(continueButton);
            continueButton.addEventListener("click", () => {
                window.location.href = "./teaTime.html";
                continueButton.remove();
            });
        } 
        else if (redirect === "secretEnd") {
            let buttonBox = document.createElement("div");
            modalContent.appendChild(buttonBox);

            // create buttons for secret endings
            let acceptButton = document.createElement("button");
            acceptButton.appendChild(document.createTextNode("Yes, let's leave the show together!"));
            buttonBox.appendChild(acceptButton);
            acceptButton.addEventListener("click", () => {
                popUpMsg.textContent = "Goodbye Main Lead! We're eloping!"
                buttonBox.remove();
                let restartButton = document.createElement("button");
                restartButton.appendChild(document.createTextNode("Restart"));
                modalContent.appendChild(restartButton);
                restartButton.addEventListener("click", (e) => {
                    window.location.href = "./playerInit.html";
                });
            });

            // continue button is reject; if clicked continues to nextDay();
            continueButton.textContent = "Sorry... I'm here to find love with the main lead only!";
            buttonBox.appendChild(continueButton);
            continueButton.addEventListener("click", () => {
                buttonBox.remove();
                nextDay();
            });
        }
    }

    // updates header based on week
    function updateHeader(weekNum) {
        if (weekNum === 6) {
            document.getElementById("welcome").innerText = `Welcome to the ${whichLead} finale!!! You must go on a date this week.`
        } else if (weekNum === 5) {
            document.getElementById("welcome").innerText = `Welcome to the fantasy suites! You must go on a date this week.`
        } else {
            document.getElementById("welcome").innerText = `Welcome to week ${weekNum} of the ${whichLead}!!!`
        }
    }

};