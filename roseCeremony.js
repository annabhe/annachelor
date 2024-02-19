window.onload = function () {
    const remainingContestants = JSON.parse(localStorage.getItem("remainingContestants")); 
    let player = JSON.parse(localStorage.getItem("player"));
    let weekNum = JSON.parse(localStorage.getItem("weekNum"));
    let contestantsToKeep = localStorage.getItem("contestantsToKeep");
    let elminatedContestants = [];
    
    let weekNumNode = document.createTextNode(weekNum);
    document.getElementById("weekCounter").appendChild(weekNumNode);

    giveRoses();
    function giveRoses() {
        // add player into contestant array
        remainingContestants.push(player);
        // sort to determine which contestants to keep/eliminate
        remainingContestants.sort((a, b,) => (a.hasRose) ? -1 : ((a.charm > b.charm) ? -1: 1));
        // split contestants into those that stay and those eliminated
        elminatedContestants = remainingContestants.slice(contestantsToKeep);
        remainingContestants.splice(contestantsToKeep);
    
        // resort according to charm stat only (only applicable if player has rose)
        if (player.hasRose) {
            remainingContestants.sort((a, b,) => (a.charm > b.charm) ? -1: 1);
        }
    
        // finale time!!!!
        if (weekNum === 6 ) {
            let modal = document.getElementById("modal");
            let popUpMsg = document.getElementById('popUpMsg');
            popUpMsg.textContent = "Are you ready... for the most dramatic ending ever?";
            modal.style.display = "block";
            document.getElementById("continueButton").addEventListener("click", () => {
                modal.style.display = "none";
                revealFinaleWinner();
            });
        }
        // eliminated (non) finale
        else if (!remainingContestants.includes(player)) {
            let modal = document.getElementById("modal");
            let popUpMsg = document.getElementById('popUpMsg');
            popUpMsg.textContent = `You've been eliminated! Sorry ${player.name}, please take a moment to say your goodbyes.`;
            modal.style.display = "block";
            document.getElementById("continueButton").addEventListener("click", () => {
                window.location.href = "./loseScreen.html"
            });
        // not eliminated continue to next week
        } else { 
            printRoseCeremony(); 
            // "Please accept this rose" modal only appears if player doesn't already have a rose
            if (!player.hasRose) {
                let modal = document.getElementById("modal");
                let popUpMsg = document.getElementById('popUpMsg');
                popUpMsg.textContent = `I really like you ${player.name}, please accept this rose.`;
                modal.style.display = "block";
                modal.addEventListener("click", () => {
                    modal.style.display = "none";
                });
                
                // for the photo in the rose ceremony
                let div = document.createElement('div');
                div.id = 'imageBox';
                let roseImg = document.createElement('img');
                roseImg.src = "./img/anna_giveRose.jpg";
                div.appendChild(roseImg);
                document.getElementsByClassName("modal-content")[0].appendChild(div);
            }
        }
    }

    // finale only: send player to winScreen or loseScreen
    function revealFinaleWinner() {
        if (!remainingContestants.includes(player)) {
            window.location.href = "./loseScreen.html"
        } else {
            window.location.href = "./winScreen.html";
        }
    }
    
    function printRoseCeremony () {
        // print the results
        printTable("contestantsStay", remainingContestants);
        printTable("contestantsLeave", elminatedContestants);
        // remove player from contestant array
        remainingContestants.splice(remainingContestants.indexOf(player), 1);
        document.getElementById("nextWeekButton").addEventListener("click", nextWeek);
    };

    // print two tables of contestants taht stay and those who are eliminated
    function printTable(tableElement, contestantArr) {
        let table = document.getElementById(tableElement);

        if (tableElement === "contestantsStay") {
            document.getElementsByClassName("tableCaption")[0].textContent = "Contestants that received a rose:"
        } else {
            document.getElementsByClassName("tableCaption")[1].textContent = "Contestants that are leaving:"
        }

        // create headers for tables
        let tr = table.insertRow(-1);
        let rankCell = tr.insertCell(0);
        rankCell.appendChild(document.createTextNode("Rank"));
        rankCell = tr.insertCell(1);
        rankCell.appendChild(document.createTextNode("Name"));
        rankCell = tr.insertCell(2);
        rankCell.appendChild(document.createTextNode("Charm"));

        for (let i = 0; i < contestantArr.length; i++) {
            let tr = table.insertRow(-1);
            // create rankCell
            let rankCell = tr.insertCell(0);
            let rankText = document.createTextNode(i + 1);
            rankCell.appendChild(rankText);
            // create nameCell
            let nameCell = tr.insertCell(1);
            let nameText = document.createTextNode(contestantArr[i].name);
            nameCell.appendChild(nameText);
            // create charmCell
            let charmCell = tr.insertCell(2);
            let charmText = document.createTextNode(contestantArr[i].charm);
            charmCell.appendChild(charmText);
        }
    }

    // updates variables in localStorage and sends user back to actionMenu
    function nextWeek() {
        player.hasRose = false;
        weekNum++;
        localStorage.setItem("weekNum", weekNum);
        localStorage.setItem("dayNum", 1);
        localStorage.setItem("remainingContestants", JSON.stringify(remainingContestants));
        localStorage.setItem("player", JSON.stringify(player));
        localStorage.setItem("hasDated", false);
        localStorage.setItem("backFromDate", false);
        window.location.href = "./actionMenu.html";
    };
};