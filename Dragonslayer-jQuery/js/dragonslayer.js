/* this was originally written in JavaScript. I have taken to convert this to 
   jQuery so that it will interact with the web page better. JavaScript is 
   cumbersome when it comes to DOM manipulation. 
   
   The original of this document was created in the Code Acaademy JavaScript 
   course explaing flows. The original can be found in tihs directory as 
   "dragonlayer.old.js"
*/

/******************************** characterObj ********************************/
function characterObj() {
	this.name = "Character's Name";
	this.sex = "Male";
	this.strength = getStat();
	this.constitution = getStat();
	this.dexterity = getStat();
	this.wisdom = getStat();
	this.intelligence = getStat();
	this.charisma = getStat();
	this.wealth = Math.floor((Math.random()*1000000) + 1);
	this.battlesSurvived = 0;
	
// 	Private functions

}	
//	Public functions
characterObj.prototype.getPronoun = function () {
	return (this.sex === "Male") ? "he" : "she";
};
	
characterObj.prototype.getStrengthDesc = function () {
	var thisStat = this.strength;
			
	if(thisStat >= 18) {
		return 'super strong';
	} else if(thisStat >= 16) {
		return 'very strong';
	} else if(thisStat >= 13) {
		return 'stronger than average';
	} else if(thisStat >= 9) {
		return 'strong';
	} else if(thisStat >= 7) {
		return 'weaker than average';
	} else if(thisStat >= 5) {
		return 'very weak';
	} else {
		return 'super weak';
	}
	
	return "error: getStrengthDesc couldn't create description"
};

characterObj.prototype.getConstitutionDesc = function () {
	var thisStat = this.constitution;
	
	if(thisStat >= 18) {
		return 'super hardy';
	} else if(thisStat >= 16) {
		return 'very hardy';
	} else if(thisStat >= 13) {
		return 'hardier than average';
	} else if(thisStat >= 9) {
		return 'hardy';
	} else if(thisStat >= 7) {
		return 'feelbler than average';
	} else if(thisStat >= 5) {
		return 'very feeble';
	} else {
		return 'super feeble';
	}
	
	return "error: getConstitutionDesc couldn't create description"
};

characterObj.prototype.getDexterityDesc = function () {
	var thisStat = this.dexterity;
	
	if(thisStat >= 18) {
		return 'super agile';
	} else if(thisStat >= 16) {
		return 'very agile';
	} else if(thisStat >= 13) {
		return 'agiler than average';
	} else if(thisStat >= 9) {
		return 'agile';
	} else if(thisStat >= 7) {
		return 'clumsier than average';
	} else if(thisStat >= 5) {
		return 'very clumsy';
	} else {
		return 'super clumsy';
	}
	
	return "error: getDexterityDesc couldn't create description"
};

characterObj.prototype.getWisdomDesc = function () {
	var thisStat = this.wisdom;
	
	if(thisStat >= 18) {
		return 'super wise';
	} else if(thisStat >= 16) {
		return 'very wise';
	} else if(thisStat >= 13) {
		return 'wiser than average';
	} else if(thisStat >= 9) {
		return 'wise';
	} else if(thisStat >= 7) {
		return 'less wise than average';
	} else if(thisStat >= 5) {
		return 'very unwise';
	} else {
		return 'super unwise';
	}
	
	return "error: getWisdomDesc couldn't create description"
};

characterObj.prototype.getIntelligenceDesc = function () {
	var thisStat = this.intelligence;
	
	if(thisStat >= 18) {
		return 'super intelligent';
	} else if(thisStat >= 16) {
		return 'very intelligent';
	} else if(thisStat >= 13) {
		return 'more intelligent than average';
	} else if(thisStat >= 9) {
		return 'intelligent';
	} else if(thisStat >= 7) {
		return 'less intelligent than average';
	} else if(thisStat >= 5) {
		return 'very unintelligent';
	} else {
		return 'super unintelligent';
	}
	
	return "error: getIntelligenceDesc couldn't create description"
};
	
characterObj.prototype.getCharismaDesc = function () {
	var thisStat = this.charisma;
	var adj = (this.sex === 'Male') ? 'handsome' : 'beautiful';
	
	if(thisStat >= 18) {
		return 'super ' + adj;
	} else if(thisStat >= 16) {
		return 'very ' + adj;
	} else if(thisStat >= 13) {
		return 'more ' + adj + ' than average';
	} else if(thisStat >= 9) {
		return adj;
	} else if(thisStat >= 7) {
		return 'less ' + adj + ' than average';
	} else if(thisStat >= 5) {
		return 'very plain';
	} else {
		return 'super plain';
	}
	
	return "error: getCharismaDesc couldn't create description"
};

characterObj.prototype.getWealthDesc = function () {
	var thisStat = this.wealth;
	
	if(thisStat >= 1000000) {
		return 'flithy rich';
	} else if(thisStat >= 100000) {
		return 'very rich';
	} else if(thisStat >= 10000) {
		return 'richer than most';
	} else if(thisStat >= 1000) {
		return 'rich';
	} else if(thisStat >= 100) {
		return 'less rich than most';
	} else if(thisStat > 0) {
		return 'very poor';
	} else {
		return 'broke';
	}
	
	return "error: getWealthDesc couldn't create description"
};

/********************************** getStat ***********************************/
var getStat = function() {
    var value = 0;
    
	while ((value <= 3) || (value > 18)) {
		value = Math.floor((Math.random()*15) + 3);
    }
	return value;
};

/****************************** Create Character ******************************/
/***************************** allFilled (event) ******************************/
var allFilled = function() {
/* this is to verify that all of the INPUT fields are filled   
	Return: TRUE if all fields are filled. 
	Usage:	Should be called on every keyup bound event to verify the fields are
			populated correctly. 
*/
    var filled = true;
	
    $('#attrForm input').each(function() {
        if(($(this).val() == '') || ($(this).parent().hasClass('has-error'))) filled = false;
    });
	
    $('#submitBtn').prop('disabled', !filled);
}

/************ toggleActive (testVal, fieldDivID, glyphiconNameID) *************/
var toggleActive = function(testVal, fieldDivID, glyphiconNameID) {
	if(testVal) {
		if($(fieldDivID).hasClass('has-error')) {
			$(fieldDivID).toggleClass('has-error has-success');
			$(glyphiconNameID).toggleClass('glyphicon-remove glyphicon-ok');
		}
	} else {
		if($(fieldDivID).hasClass('has-success')) {
			$(fieldDivID).toggleClass('has-error has-success');
			$(glyphiconNameID).toggleClass('glyphicon-remove glyphicon-ok');
		}
	}
	
	allFilled();
}

/********************************* btnGetChar *********************************/
var btnGetChar = function(playerObj) { 
	// do qualification of text (alert?), then call next step
	var key;
	var thisValue = "";
	var postText = "";

	// Not knowing what other properties might be added to the object, only check for the ones needed
	var statArray = [
		'name',
		'sex',
		'strength',
		'constitution',
		'dexterity',
		'wisdom',
		'intelligence',
		'charisma',
		'wealth'];
	
	// populate player 
	for (key in playerObj) {
		if($.inArray(key, statArray) > -1) { 
			thisValue = $('#get' + key.toProperCase()).val();
			if (typeof thisValue === 'string') {
				thisValue = thisValue.toProperCase();
			}
			if (thisValue === undefined) {
				thisValue = $("#divSex input[type='radio']:checked").val();
			}
			playerObj[key] = thisValue;
		}
	}
	
	// create the title!
	postText += playerObj.name + ' the Dragonslayer!';
	$('<h1>').appendTo('#story')
		.attr('id', 'storyTitle')
		.addClass('dragonslayer')
		.text(postText);
		
	// create story text
	postText = "";
	postText += 'There was once a hero named ' + playerObj.name + '. ';
	postText += playerObj.getPronoun().toProperCase() + ' was ';
	postText += playerObj.getStrengthDesc() + ', ';
	postText += playerObj.getConstitutionDesc() + ', ';
	postText += playerObj.getDexterityDesc() + ', ';
	postText += playerObj.getWisdomDesc() + ', ';
	postText += playerObj.getIntelligenceDesc() + ', ';
	postText += playerObj.getCharismaDesc() + ', and ';
	postText += playerObj.getWealthDesc() + '.';
	
	//post the story text
	$('<p>').text(postText).appendTo('#story');  
	
	// call the adventure!
	turnBegin(playerObj);
}

/******************************** addCharName *********************************/
var addCharName = function(attrName, playerObj) {
	var labelText = attrName.toProperCase();	//Name
	var fgNameID = "#" + attrName;				//#name
	var fieldDiv = "div" + labelText;			//divName
	var fieldDivID = "#" + fieldDiv;			//#divName
	var returnField = "get" + labelText;		//getName
	var returnFieldID = '#' + returnField;		//#getName
	var glyphiconName = 'glyphicon' + attrName;	//glyphiconName
	var glyphiconNameID = '#' + glyphiconName;	//#glyphiconName
	
	//Define the new fields
	$('<label>').appendTo(fgNameID)
		.attr('for', returnField)
		.addClass('control-label')
		.text(labelText);
	
	$('<div>').appendTo(fgNameID)
		.attr('id', fieldDiv)
		.addClass('has-feedback')
		.addClass("has-error");
		
	$('<input>').appendTo(fieldDivID)
		.attr("id", returnField)
		.addClass("form-control")
		.attr("type", "text")
		.attr("placeholder", playerObj.name);

	//glyphicon
	$('<span>').appendTo(fieldDivID)
		.attr('id', glyphiconName)
		.addClass('glyphicon')
		.addClass('glyphicon-remove')
		.addClass('form-control-feedback');
		
	$(returnFieldID).keyup( function () {
		toggleActive(
			($(this).val().length > 0),
			fieldDivID,
			glyphiconNameID
		);
	});
}

/********************************* addCharSex *********************************/
var addCharSex = function(attrName, playerObj) {
	var optionsList = ["Male", "Female"];
	var opt = "";
		
	var fgNameID = "#" + attrName;						//form group name = #sex
	var returnField = "get" + attrName.toProperCase();	//getSex
	var rowName = attrName + "Row"
	var rowID = '#' + rowName;
	var radioLabelName = attrName + 'Label';
//	var radioLabelID = "#" + radioLabelName;
	var radioGrpDivName = "div" + attrName.toProperCase();		//divSex
	var radioGrpDivID = "#" + radioGrpDivName;					//#divSex
	var thisDivName = "";
	var thisDivID = "#" + thisDivName;
	var thisLabelName = "";
	var thisLabelID = "#" + thisLabelName;
	var thisFieldName = "";
//	var thisFieldID = "#" + thisFieldName;
	
	//Define the "row" to contain the 2 sets of objects, the label and the radio buttons
	$('<div>').appendTo(fgNameID)
		.attr('id', rowName)
		.addClass( 'row' );
	
	$('<label>').appendTo(rowID)
		.attr('id', radioLabelName)
		.prop('for', radioGrpDivName)
		.addClass('control-label')
		.addClass('col-sm-5')
		.text("Select your character's sex");
		
	$('<div>').appendTo(rowID)
		.attr('id', radioGrpDivName)
		.addClass('col-sm-7');
		
	//add the radio buttons
	for ( opt in optionsList ){
		thisDivName = 'div' + optionsList[opt];
		thisDivID = "#" + thisDivName;
		
		thisLabelName = 'label' + optionsList[opt];
		thisLabelID = "#" + thisLabelName;
		
		thisFieldName = optionsList[opt];
		
		$('<div>').appendTo(radioGrpDivID)
			.attr('id', thisDivName)
			.addClass('radio');
		
		$('<label>').appendTo(thisDivID)
			.attr('id', thisLabelName);
		
		$('<input>').appendTo(thisLabelID)
			.attr('id', thisFieldName)
			.prop('type', 'radio')
			.prop('name', returnField)
			.val(optionsList[opt]);
		
		$(thisLabelID).html($(thisLabelID).html() + optionsList[opt]);
	}
	
	$('#' + playerObj.sex).prop('checked', true);
}

/******************************** addCharStat *********************************/
var addCharStat = function(attrName, playerObj) {
	var labelText = attrName.toProperCase();	//stat_name
	var fgNameID = "#" + attrName;				//#stat_name
	var fieldDiv = "div" + labelText;			//divStat_name
	var fieldDivID = "#" + fieldDiv;			//#divStat_name
	var returnField = "get" + labelText;		//getStat_name
	var returnFieldID = '#' + returnField;		//#getName
	var glyphiconName = 'glyphicon' + attrName;	//glyphiconStat_name
	var glyphiconNameID = '#' + glyphiconName;	//#glyphiconStat_name
	
	//Setup the fields
	$('<label>').appendTo(fgNameID)
		.attr('id', returnField + 'Label')
		.prop('for', returnField)
		.addClass('control-label')
		.addClass('col-sm-7')
		.text(labelText);
	
	$('<div>').appendTo(fgNameID)
		.attr('id', fieldDiv)
//		.addClass('has-feedback')
		.addClass("has-success")
		.addClass('col-sm-5');
	
	$('<input>').appendTo(fieldDivID)
		.attr("id", returnField)
		.addClass("form-control")
		.prop('type', 'number')
		.prop('min', '3')
		.prop('max', '18')
		.val(playerObj[attrName]);

	//glyphicon
	$('<span>').appendTo(fieldDivID)
		.attr('id', glyphiconName)
		.addClass('glyphicon')
		.addClass('glyphicon-ok')
		.addClass('form-control-feedback')
		.css('top', '0')
		.css('right', '-15px'); // for some reason the glyphicon is on the border of the box. This moves it into the box (left), -15 moves it out of the box (right)
		
	$(returnFieldID).keyup( function () {
		var statValue = $(this).val();
		
		toggleActive(
			(
				(statValue.length > 0) && 
				(statValue >= 3) && 
				(statValue <= 18)
			), 
			fieldDivID, 
			glyphiconNameID
		);
	});
}

/******************************* addCharWealth ********************************/
var addCharWealth = function(attrName, playerObj) {
	var labelText = attrName.toProperCase();	//Wealth
	var fgNameID = "#" + attrName;				//#wealth
	var fieldDiv = "div" + labelText;			//divWealth
	var fieldDivID = "#" + fieldDiv;			//#divWealth
	var returnField = "get" + labelText;		//getWealth
	var returnFieldID = '#' + returnField;		//#getWealth
	var glyphiconName = 'glyphicon' + attrName;	//glyphiconWealth
	var glyphiconNameID = '#' + glyphiconName;	//#glyphiconWealth
	
	//Setup the fields
	$('<label>').appendTo(fgNameID)
		.attr('id', returnField + 'Label')
		.prop('for', returnField)
		.addClass('control-label')
		.text(labelText);
	
	$('<div>').appendTo(fgNameID)
		.attr('id', fieldDiv)
		.addClass('has-feedback')
		.addClass('has-success');
	
	$('<input>').appendTo(fieldDivID)
		.attr('id', returnField)
		.addClass('form-control')
		.prop('type', 'number')
		.prop('min', '0')
		.prop('max', '1000000')
		.val(playerObj[attrName]);

	//glyphicon
	$('<span>').appendTo(fieldDivID)
		.attr('id', glyphiconName)
		.addClass('glyphicon')
		.addClass('glyphicon-ok')
		.addClass('form-control-feedback');
		
	$(returnFieldID).keyup( function () {
		var amount = $(this).val();
		
		toggleActive(
			(
				(amount.length > 0) && 
				(amount >= 0) && 
				(amount <= 1000000) && 
				(amount.indexOf('.') < 0)
			), 
			fieldDivID,
			glyphiconNameID
		);		
	});
}

/***************************** setCharAttributes ******************************/
var setCharAttributes = function(player) {
	var instructions = "Set the attributes of your character:";
	var key="";

	clearFields('#getData'); //form fields
	clearFields('#story'); //form fields
	
	//Add the new fields and properties
	$('<p>').text(instructions).appendTo('#getData');
	
	//create the form's framework
	$('<from>').appendTo('#getData')
		.attr('id', 'attrForm')
		.attr('role', 'form');
	
	for(key in player) {
		if (typeof player[key] !== 'function') {
			$('<div>').appendTo('#attrForm')
				.attr('id', key)
				.addClass('form-group');
			
			switch (key) {
				case 'name':
					addCharName(key, player);
					break;
				case 'sex':
					addCharSex(key, player);
					break;
				case 'strength':
				case 'constitution':
				case 'dexterity':
				case 'wisdom':
				case 'intelligence':
				case 'charisma':
					addCharStat(key, player);
					break;
				case 'wealth':
					addCharWealth (key, player);
					break;
				default:
					break;
			}
		}
	}
	
	$('<button>').appendTo('#getData')
		.attr('id', 'submitBtn')
		.text('Submit')
		.addClass('btn')
		.addClass('btn-primary')
		.addClass('center-block')
		.prop('disabled', 'true')
		.click(function() { btnGetChar(player) });

	$('#getName').focus();
	
}

/************************************ game ************************************/
/********************* printOptions (player, arrOptions) **********************/
var printOptions = function(playerObj, arrOptions) {
	var opt = "";
	
	if(arrOptions.length <= 0) {
		$('<p>').text("you have no options!").appendTo('#getData');
		return;
	} 
	
	$('<div>').appendTo('#getData')
		.attr('id', 'actionChoices')
		.addClass('btn-group-vertical');
	
	for(opt in arrOptions) {
		$('<button>').appendTo('#actionChoices')
			.attr('id', arrOptions[opt])
			.text(arrOptions[opt])
			.addClass('btn')
			.addClass('btn-primary')
			.addClass('center-block')
			.click(function(event) { 
				var action = this.innerHTML;
				
				turnEnd(playerObj, action); 
			});
	}
	
	$('<button>').appendTo('#getData')
		.attr('id', 'End')
		.text('End Story')
		.addClass('btn')
		.addClass('btn-info')
		.addClass('pull-right')
		.addClass('end')
		.click(function(event) { 
			var action = "End";
			
			turnEnd(playerObj, action); 
		});
}

/***************************** turnBegin (player) *****************************/
var turnBegin = function(playerObj) {
	var answer = ""
	
	clearFields('#getData');
	
	//Add the new fields and properties
	$('<p>').appendTo('#getData')
		.text("Well, " + playerObj.name + ", you see a dragon. What do you do?");
	
	printOptions(playerObj, ['Fight', 'Pay', 'Run']);
}

/************************* turnEnd (player, action); **************************/
var turnEnd = function(playerObj, answer) {
	isAlive = true;
	resultTxt = "";
	
	action = answer.toLowerCase();
	
	switch(action) {
		case "fight":
			if(playerObj.strength > 15) {
				resultTxt += playerObj.name + " is strong and wins the fight!";
			} else {
				resultTxt += playerObj.name + " learns weaklings shouldn't fight!";
				isAlive = false;
			};
			break;
		case "pay":
			if((playerObj.wealth > "8000") || (playerObj.charisma > 15)) {
				resultTxt += playerObj.name + " survived, but is now broke.";
				playerObj.wealth = 0;
			} else if (playerObj.intelligence > 16) {
				resultTxt += playerObj.name + " should have been smart enough to run!";
				isAlive = false;
			}/* else if (prompt("You can't afford it. Do you accept indentured servitude to pay off your debt? (y/n)").toLowerCase() === "y") {
				console.log("You work hard the rest of your life to pay off your debt.")
				console.log("It turns out it was a short life because the dragon ate you anyways.")
			} */
			else {
				confirm("You can't afford that, make another choice.");
				$('#' + answer).prop('disabled', 'true');
				return; // exit this before restarting the story
			}
			break;
		case "run":
			if((playerObj.strength > 15) && (playerObj.dexterity > 15)) {
				resultTxt += (playerObj.name + " manges to escape.");
			} else{
				resultTxt += "The dragon catches " + playerObj.name + 
					" and eats ";
				resultTxt += (playerObj.sex === "Male") ? "him." : "her.";
				isAlive = false;
			}			
			break;
		case "end":
			isAlive = false;
			break;
		default:
			confirm ("Something unexpected happened");
			return;
	}
	
	if(action !== 'end') {
		$('<p>').appendTo('#story')
			.text(resultTxt);	
	}
			
	if(isAlive) {
		playerObj.battlesSurvived++;
		turnBegin(playerObj);
	} else {
		gameEnd(playerObj);
	}
	
}

/****************************** gameEnd(player) *******************************/
var gameEnd = function(playerObj) {
	var finalTxt = "";
	var wins = playerObj.battlesSurvived;
	var pronoun = playerObj.getPronoun();
	
	if(wins === 0) {
		finalTxt += ('Unfortunately ' + playerObj.name + ' died without winning \
			a single battle. ' + pronoun.toProperCase() + ' fame did not extend \
			beyond ' + pronoun + ' family.');
	} else if (wins < 4) {
		finalTxt += (playerObj.name + ' won ' + wins + ' battles. \
			' + pronoun.toProperCase() + ' fame will extend to the local \
			village!');
	} else {
		finalTxt += (playerObj.name + ' won ' + wins + ' battles!!! \
			' + pronoun.toProperCase() + ' fame will extend to the whole \
			world and be celebrated for all times!');
	}
		
	$('<p>').appendTo('#story')
		.text(finalTxt)
		.addClass('end');
	
	//start over
	main();
}

/************************************ main ************************************/
var main = function() {
	var player = new characterObj();
	
	clearFields('#getData');
	
	$('<p>').appendTo('#getData')
		.text("Are  you ready to begin?");
		
	$('<button>').appendTo('#getData')
		.attr('id', "start")
		.addClass('center-block')
		.text('Start')
		.click(function () { setCharAttributes(player) });
}


/********************************* Utilities **********************************/
String.prototype.toProperCase = function () {
	return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/******************************** clearFields *********************************/
var clearFields = function(divID) {
	//clear the existing fields 
	$(divID).empty();	
}

/* called upon load */
$(document).ready(main);


