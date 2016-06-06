var getUserName = function() {
    var name = ""
    while (name === "") {
        name = prompt("What is your name?");
    };
    return name[0].toUpperCase() + name.substring(1,name.length).toLowerCase();
};

var getStat = function(stat) {
    var value = 0;
    while (!value) {
        value = prompt("what is your " + stat + "? (1-18)", Math.floor((Math.random()*18) + 1));
        
        if((value > 0) && (value <= 18)) {
            return value;
        }
        console.log("That was not valid, please try again.");
    };
};

function main () {
	var user = getUserName();
	var strength = getStat("strength");
	var constitution = getStat("constitution");
	var dexterity = getStat("dexterity");
	var wisdom = getStat("wisdom");
	var intelligence = getStat("intelligence");
	var chraisma = getStat("charisma");
	var wealth = prompt("How much money do you have?", Math.floor((Math.random()*1000) + 1));

	var answer = prompt("Well, " + user + ", you see a dragon. What do you do, (fight, pay, run)?", "run").toLowerCase();

	switch(answer) {
		case "fight":
			if(strength >15) {
				console.log("You're strong. You win!");
			} else {
				console.log("Weaklings shouldn't fight!");
			};
			break;
		case "pay":
			if((wealth >"800") || (charisma < 15)) {
				console.log("You survive, but are now broke.");
				wealth = 0;
			} else if (intelligence > 16) {
				console.log("You should have been smart enough to run!");
			} else if (prompt("You can't afford it. Do you accept indentured servitude to pay off your debt? (y/n)").toLowerCase() === "y") {
				console.log("You work hard the rest of your life to pay off your debt.")
				console.log("It turns out it was a short life because the dragon ate you anyways.")
			} else {
				console.log("You died");
			}
			break;
		case "run":
			break;
		default:
			console.log(answer + " was not an option");
	}

}