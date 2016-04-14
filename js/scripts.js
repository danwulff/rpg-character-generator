//Business Logic
//----------------------------------------
//localStorage Saved Input Array Objects

if (!localStorage.savedCharacters) {
  localStorage.savedCharacters = JSON.stringify([]);
  }

var savedCharacters = JSON.parse(localStorage.savedCharacters);

document.addEventListener("DOMContentLoaded", function() {
  savedCharacters.forEach(function(char) {
    $("ul#savedList").prepend("<li class='clickSave'>" + char.name + "</li>");
    $(".clickSave").first().click(function() {
      //when clicked, print
      printCharacterOutput(char);
    });
  });
});

//Character Constructor
function Character(characterName, gender, age, realm, race, profession){
  this.name = characterName;
  this.age = age;
  this.gender = gender;
  this.realm = realm;
  this.race = race;
  this.profession = profession;
  this.description = this.random(descriptions);
  this.quest = this.random(quests);
}

//random testing
Character.prototype.random = function(library) {
  return library[Math.floor(Math.random()*library.length)];
}


//User Interface Logic
//----------------------------------------

//Randomize function
function randomize(charObj) {
  if (charObj.gender === '') {
    charObj.gender = charObj.random(gender);
  }

  if (charObj.age === '') {
    charObj.age = charObj.random(ages);
  }

  if (charObj.realm === '') {
    charObj.realm = charObj.random(realms);
  }

  if (charObj.realm === 'Middle Earth') {
    if (charObj.name === '' && charObj.gender === 'Male') {
      charObj.name = charObj.random(namesMaleMiddleEarth);
    } else if (charObj.name === '' && charObj.gender === 'Female'){
      charObj.name = charObj.random(namesFemaleMiddleEarth);
    } else if (charObj.name === '') {
        var randomValue = Math.random();
        if (randomValue < 0.5) {
          charObj.name = charObj.random(namesMaleMiddleEarth);
        } else {
          charObj.name = charObj.random(namesFemaleMiddleEarth);
        }
    }

    if (charObj.race === '') {
      charObj.race = charObj.random(racesMiddleEarth);
    }

    if (charObj.profession === '') {
      charObj.profession = charObj.random(professionsMiddleEarth);
    }

  } else if (charObj.realm === 'Modern Earth'){
    if (charObj.name === '' && charObj.gender === 'Male') {
      charObj.name = charObj.random(namesMaleModernEarth);
    } else if (charObj.name === '' && charObj.gender === 'Female'){
      charObj.name = charObj.random(namesFemaleModernEarth);
    } else if (charObj.name === '') {
        var randomValue = Math.random();
        if (randomValue < 0.5) {
          charObj.name = charObj.random(namesFemaleModernEarth);
        } else {
          charObj.name = charObj.random(namesMaleModernEarth);
        }
    }


    if (charObj.race === '') {
      charObj.race = charObj.random(racesModernEarth);
    }

    if (charObj.profession === '') {
      charObj.profession = charObj.random(professionsModernEarth);
    }

  } else {
    if (charObj.name === '' && charObj.gender === 'Male') {
      charObj.name = charObj.random(namesMaleStarTrek);
    } else if (charObj.name === '' && charObj.gender === 'Female'){
      charObj.name = charObj.random(namesFemaleStarTrek);
    } else if (charObj.name === '') {
        var randomValue = Math.random();
        if (randomValue < 0.5) {
          charObj.name = charObj.random(namesFemaleStarTrek);
        } else {
          charObj.name = charObj.random(namesMaleStarTrek);
        }
    }

    if (charObj.race === '') {
      charObj.race = charObj.random(racesStarTrek);
    }

    if (charObj.profession === '') {
      charObj.profession = charObj.random(professionsStarTrek);
    }
  }
}

//print output paragraph for character
function printCharacterOutput (charObj) {
  $("#outputName").text(charObj.name);
  $("#outputAge").text(charObj.age);
  $("#outputRace").text(charObj.race);
  $("#outputGender").text(charObj.gender);
  $("#outputProfession").text(charObj.profession);
  $("#outputRealm").text(charObj.realm);
  $("#outputDescription").text(charObj.description);
  $("#outputQuest").text(charObj.quest);
  $("#characterOutput").show();

  //shows output box dependent on realm
  if (charObj.realm === 'Middle Earth') {
    document.getElementById('outputImageBackground').style.background = "url('img/middleEarth.png')";
  } else if (charObj.realm === 'Modern Earth') {
    document.getElementById('outputImageBackground').style.background = "url('img/modernEarth.jpg')";
  } else if (charObj.realm === 'Star Trek') {
    document.getElementById('outputImageBackground').style.background = "url('img/starTrek.jpg')";
  }
}


//print history list
function printHistoryList (charObj) {
  //show button to allow list to be cleared
  $("#clearHistory").show();
  //add character to top of list
  $("ul#historyList").prepend("<li class='clickHistory'>" + charObj.name  + "</li>");
  //create listener to re-display character when clicked
  $(".clickHistory").first().click(function() {
    //temp variable to remove from history list when character is moved to save list
    var histListItem = this;
    //call print function
    printCharacterOutput(charObj);
    //update currentChar variable
    currentChar = charObj;
    //show save button
    $("#saveChar").show();

    //listener to remove from history list when saved
    // $("#saveChar").click(function () {
    //  histListItem.remove();
    // });
  });
}

//print save list
function printSaveList (charObj) {
  //add character to top of save list
  $("ul#savedList").prepend("<li class='clickSave'>" + currentChar.name  + "</li>");
  $(".clickSave").first().click(function() {
    //when clicked, print
    printCharacterOutput(charObj);
    //hide save button (already been saved)
    $("#saveChar").hide();
  });
}

// clear history
function clearHistoryList() {
  $("ul#historyList").html('');
}
//User Interface Logic---------------------------------------------------------------

//global variable used to keep track of character to add to save list
var currentChar = undefined;

$(document).ready(function() {
  $('#characterOutput').hide();
  $("#clearHistory").hide();
  $("#saveChar").hide();

  //removes clear button on load if no saved characters exist
  if (!savedCharacters[0]) {
    $('#clearSavedCharacters').hide();
  }

  //submit for new character
  $("#submitCharacter").submit(function(event){
    event.preventDefault();

    var genderChoice;

    if ($('#altGender').val() === '') {
      genderChoice = $('#gender').val();
    } else {
      genderChoice = $('#altGender').val();
    }

    //create character
    var newCharacter = new Character($('#characterName').val(), genderChoice, $('#age').val(), $('#realm').val(), $('#race').val(), $('#profession').val());
    //randomize character (where fields were left blank)
    randomize(newCharacter);
    //print latest character
    printCharacterOutput(newCharacter);
    printHistoryList(newCharacter);

    //show save button
    $("#saveChar").show();
    //update currentChar
    currentChar = newCharacter;

    // reset form after submit
    document.getElementById("submitCharacter").reset();
  });


  $("#saveChar").click(function () {

    //create listener for save button
    printSaveList(currentChar);
    //hide save button
    $("#saveChar").hide();
    savedCharacters.push(currentChar);
    localStorage.savedCharacters = JSON.stringify(savedCharacters);
    $("#clearSavedCharacters").show();
  });

  $("#clearHistory").click(function() {
    //clears history list
    clearHistoryList();
    $("#clearHistory").hide();
  });

  $("#clearSavedCharacters").click(function() {
    localStorage.clear();
    $("ul#savedList").html('');
    $("#clearSavedCharacters").hide();
  });

});


//Library
//----------------------------------------
var realms = ['Middle Earth', 'Modern Earth', 'Star Trek'];
var namesMaleMiddleEarth = ['Tim the Enchanter', 'Snarf the Thundercat', 'George Constanza'];
var namesFemaleMiddleEarth = ['Aeowyn', 'Rosie'];
var namesMaleModernEarth = ['Tim', 'Scott Waverly'];
var namesFemaleModernEarth = ['Samantha Barnes', 'Catherine'];
var namesMaleStarTrek = ['Grokar Gnoshes', 'Malcadoors', 'Corbus Lorax'];
var namesFemaleStarTrek = ['Saldia Cornwall', 'Dartitha Darkness', 'Sally Sellsseashells'];
var gender = ['Male', 'Female'];
var ages = ['a Young', 'a Middle-aged', 'an Old'];
var racesMiddleEarth = ['Dwarf', 'Elf', 'Goblin', 'Human', 'Ent', 'Orc', 'Hobbit', 'Bearward', 'Eagle', 'Troll', 'Banshee', 'Uruk-hai', 'Balrog', 'Dragon'];
var racesModernEarth = ['Human', 'Deer', 'Dolphin'];
var racesStarTrek = ['Klingon', 'Human', 'Borg', 'Synthetic Life Form', 'Ferengi', 'Romulan', 'Vulcan', 'Xindi'];
var professionsMiddleEarth = ['Baker', 'Mercenary', 'Ruler', 'Toymaker', 'Ranger', 'Ferryman', 'Innkeeper', 'Stablehand', 'Lord', 'Gatekeeper', 'Blacksmith', 'Bard'];
var professionsModernEarth = ['CIA Operative', 'Cabbie', 'Mercenary', 'Baker', 'Programmer', 'Toymaker', 'Farmer', 'Jockey', 'Pilot', 'Golfer', 'Ambassador', 'General'];
var professionsStarTrek = ['Federation Officer', 'Redshirt', 'Engineer', 'Barkeep', 'Trader', 'Pilot', 'Pirate', 'Miner', 'Doctor', 'Mercenary', 'Baker'];
var descriptions = ['have slain 500 orcs', 'have baked over 100 cakes', 'have defeated over 100 mercenary bakers'];
var quests = ['to seek the holy grail', 'to annoy the felonius Monk', 'to bake 101 cakes'];
