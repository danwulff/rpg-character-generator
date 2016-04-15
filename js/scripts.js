//Business Logic
//----------------------------------------

//Animate CSS to apply effects in js
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

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
  $('#characterOutput').animateCss('fadeIn');


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
var gender = ['Male', 'Female'];
var ages = ['a Young', 'a Middle-aged', 'an Old'];

var namesMaleMiddleEarth = ['Snarf the Thundercat', 'George Constanza', 'Tilion', 'Tim the Enchanter', 'Balbo', 'Bill the Pony', 'Bungo', 'Findis', 'Elendur', 'Ginglith', 'Gror', 'Imin', 'Hiril', 'Lagduf', 'Khamul', 'Imin', 'Maiar', 'Meneldur', 'Morgoth', 'Ordoreth', 'Pengolodh', 'Salmar', 'Tilion', 'Ferumbras', 'Ufthak', 'Wulf', 'Slar Marodel', 'Chur Na', 'Gordah Tankil'];
var namesFemaleMiddleEarth = ['Aeowyn', 'Rosie', 'Nimrodel', 'Arien', 'Aredhel', 'Adrahil', 'Aradhel', 'Emeldir', 'Earwen', 'Elanor', 'Firiel', 'Elena', 'Ivriniel', 'Inzilbeth', 'Ingwe', 'Miriel', 'Nienna', 'Baruthiel', 'Lobelia', 'Vanimelde', 'Yavanna',  'Helga'];
var professionsMiddleEarth = ['Baker', 'Mercenary', 'Ruler', 'Toymaker', 'Ranger', 'Ferryman', 'Innkeeper', 'Stablehand', 'Gatekeeper', 'Blacksmith', 'Bard', 'Warrior', 'Wizard', 'Brewer', 'Hermit', 'Ambassador', 'General', 'Mouth of Sauron', 'Carpenter', 'Mason', 'Miner', 'Farmer', 'Jeweler', 'Fisherman', 'Tailor', 'Alchemist', 'Apiarian', 'Apothecary', 'Armourer', 'Brasier', 'Astrologer', 'Barber ', 'Dentist', 'Basket maker', 'Bathrooms proprietor', 'Bell founder', 'Boatwright', 'Bowyer', 'Brick and lime burner', 'Bridger', 'Broderer', 'Broom maker', 'Buckle and clasp maker', 'Butcher', 'Caravan master', 'Chandler', 'Cheesemaker', 'Chirurgeon', 'Cobbler', 'Combmaker', 'Cook', 'Cooper', 'Cordwainer', 'Currier', 'Cutler', 'Dice maker', 'Draught horses lender', 'Dyer', 'Farrier', 'Fishmonger', 'Fletcher', 'Fuller', 'Furrier', 'Girdler', 'Glass maker', 'Goldsmith', 'Gravedigger', 'Greengrocer', 'Hammersmith', 'Hand porter', 'Milliner', 'Locksmith', 'Loriner', 'Mercer', 'Merchant', 'Miller', 'Minstrel', 'Moneychanger', 'Muleteer', 'Navigator', 'Needle maker', 'Packer', 'Painter', 'Plaisterer', 'Plumber', 'Potter', 'Poulter',  'Quarry worker', 'Rat catcher', 'Saddler', 'Salter', 'Sewer cleaner and garbage remover', 'Shepherd', 'Shipmaker', 'Shipmaster', 'Silkmaker', 'Silversmith', 'Skinner', 'Smelter', 'Spinner', 'Sculptor', 'Tanner', 'Tapestry weaver', 'Teacher', 'Thatcher', 'Trapper', 'Vintner', 'Wagonmaker', 'Weaver', 'Wheelwright', 'Wood cutter',  'Wood carver'];
var racesMiddleEarth = ['Dwarf', 'Elf', 'Goblin', 'Human', 'Ent', 'Orc', 'Hobbit', 'Shape-Shifter', 'Eagle', 'Troll', 'Banshee', 'Uruk-hai', 'Balrog', 'Dragon', 'Giant'];

var namesMaleModernEarth = ['Tim', 'Scott Waverly', 'Elon Misk',  'Aaron Vitello',  'Tobias Trippe',  'Joey Grosz',  'Rhett Deltoro', 'Ezequiel Ammann', 'Mac Spotts', 'Elias Player', 'Raymundo Caudell', 'Kraig Sifford', 'Marcos Vanderploeg', 'Lyman Buske', 'Louis Killebrew', 'Michael McCraney', 'Pablo Yee', 'Harry Carlino', 'Arnold Riera', 'Danilo Dailey', 'Dale Boyster', 'Jamaal Wegner', 'Millard Atchinson', 'Homer Monaco', 'Robbie Ruhl', 'Clifton Wrona', 'Kory Quintanar', 'Thurman Connon', 'Elliott Dibella', 'Numbers Musser', 'Warren Eidson', 'Hubert Durante', 'Anibal Mirza', 'Gregorio Gunder', 'Adolph Causey', 'Erwin Mcclinton', 'Justin Cruce', 'Freddy Karst', 'Albert Nuckols', 'Doyle Oliveros', 'Peter Piccard', 'Filiberto Gadson', 'Tad Osterman', 'Giuseppe Icenhour', 'Austin Liles', 'Rey Kraushaar', 'Antione Hoerr', 'Jesus Hudgens', 'Jermaine Barlow', 'Armando Wrede', 'Darnell Canty', 'Maynard Choe', 'Wilfred Wenzl', 'Cody Padilla', 'Geoffrey Guerrero', 'Grant	Figueroa', 'Juan Santos', 'Rickey Carlson', 'Angelo Tucker', 'Herbert	 Cobb', 'David	Garrett', 'Spencer Sullivan', 'Freddie Guzman', 'Blake Parker', 'Rudy	Dunn', 'Edgar	Mcdonald', 'Bert Cole', 'Casey Simpson', 'Ricardo Long', 'Joey	Aguilar', 'Clayton Gill', 'Pedro Henderson', 'Rudolph Moss', 'Darrell Welch', 'Jan	Boyd', 'Roy Roberson', 'Patrick Yates', 'Jermaine Brooks', 'Wilbert Pope', 'Alvin Austin', 'Kevin	 Quinn'];
var namesFemaleModernEarth = ['Samantha Barnes',  'Brenda Hill', 'Tammy Cook', 'Christine Bennett', 'Susan Mitchell', 'Nancy James', 'Jacqueline Perry', 'Margaret Lewis', 'Melissa Kelly', 'Stephanie Morgan', 'Denise Martin', 'Heather Peterson', 'Evelyn Flores', 'Lois Foster', 'Rebecca Martinez', 'Beverly Brooks', 'Wanda Ward', 'Marie Carter', 'Sandra Thomas', 'Ruby Edwards', 'Theresa Hall', 'Jean Butler', 'Donna Evans', 'Ann Gonzalez', 'Jane Bailey', 'Joan Jones', 'Joyce Williams', 'Phyllis Collins', 'Teresa Jackson', 'Dorothy Miller', 'Helen Parker', 'Pamela Phillips', 'Nicole Davis', 'Cynthia Sanchez', 'Sharon Torres',  'Marilyn Washington', 'Ashley Wilson', 'Jessica Walker', 'Janice Bell', 'Annie Coleman', 'Anna Wood', 'Karen Brown', 'Maria Henderson', 'Carol Richardson', 'Lori Griffin', 'Kathryn Garcia', 'Norma Young', 'Laura Powell', 'Paula Hughes', 'Virginia Taylor', 'Patricia Cooper', 'Catherine Murphy', 'Martha Robinson', 'Sara Baker', 'Diane Anderson', 'Ruth Lee', 'Rachel Ross', 'Emily Nelson', 'Louise Scott', 'Barbara Price', 'Amanda Stewart', 'Jennifer Cox', 'Debra Johnson', 'Julia Rivera', 'Bonnie Hernandez', 'Sarah Gray', 'Rose Bryant', 'Carolyn Jenkins', 'Betty Green', 'Cheryl Reed', 'Anne Adams', 'Judy White', 'Julie Russell', 'Gloria Alexander', 'Kimberly Wright', 'Mary Barnes', 'Angela Morris', 'Mildred Turner',  'Janet Allen', 'Christina Rogers', 'Shirley Howard', 'Alice Ramirez', 'Andrea Diaz',  'Irene Perez',  'Michelle Gonzales',  'Elizabeth Roberts',  'Kelly Lopez',  'Amy Long',  'Doris Harris',  'Tina Watson',  'Judith Clark',  'Lillian Moore',  'Katherine King',  'Deborah Smith',  'Kathleen Rodriguez',  'Frances Simmons',  'Kathy Thompson',  'Diana Sanders',  'Lisa Patterson',  'Linda Campbell'];
var racesModernEarth = ['Human', 'Deer', 'Dolphin',  'Elephant',  'Flounder',  'Bison',  'Crocodile',  'Honey Badger'];
var professionsModernEarth = ['CIA Operative', 'Cabbie', 'Mercenary', 'Baker', 'Programmer', 'Toymaker', 'Farmer', 'Jockey', 'Pilot', 'Golfer', 'Ambassador', 'General', 'Carpenter', 'Mason', 'Miner', 'Farmer', 'Jeweler', 'Fisherman', 'Tailor',  'Stamper',  'Accountant',  'Actor',  'Air traffic controller',  'Astronomer',  'Archaeologist',  'Auctioneer',  'Banker',  'Beekeeper',  'Biologist',  'Bookkeeper',  'Botanist',  'Brewer',  'Bricklayer',  'Building inspector',  'Butler',  'Cartographer',  'Carpenter',  'Choreographer',  'Cook',  'Croupier',  'Dancer',  'Disc Jockey',  'Driving instructor',  'Economist',  'Editor',  'Faith Healer',  'Farmer',  'Fashion Designer',  'Film Critic',  'Financial Analyst',  'Fisherman',  'Fortune Teller',  'Gardener',  'Geneticist',  'Geographer',  'Geologist',  'Gravedigger',  'Gunsmith',  'Guide',  'Historian',  'Herbalist',  'Hotel Receptionist',  'Image Consultant',  'Insurance Salesperson',  'Judge',  'Knitter',  'Land Surveyor',  'Lifeguard',  'Laundry worker',  'Lithographer',  'Mathematician',  'Meteorologist',  'Midwife',  'Model',  'Musician',  'Nanny',  'Nurse',  'Nutritionist',  'Obstetrician',  'Occupational therapist',  'Office Supervisor',  'Painter',  'Parking enforcement officer',  'Parole Officer',  'Pathologist',  'Patent Agent',  'Patent Lawyer',  'Personal Assistant',  'Parking Lot Attendant',  'Physical Therapist',  'Plumber',  'Plastic Surgeon',  'Psychologist',  'Psychiatrist',  'Public Relations Manager',  'Quality Control Inspector',  'Real Estate Broker',  'Referee',  'Respiratory Therapist',  'Safety Inspector',  'Sales Representative',  'Screenwriter',  'Set Designer',  'Social Worker',  'Sound Engineer',  'Speech Pathologist',  'Sports Agent',  'Steelworker',  'Student',  'Systems Analyst',  'Travel Agent',  'Teacher',  'Travel Writer',  'Truck Driver',  'Urban Planner',  'Vending Machine Mechanic',  'Veterinarian',  'Welder',  'Zoologist'];

var namesMaleStarTrek = ['Grokar Gnoshes', 'Malcadoors', 'Corbus Lorax', 'Rory Stoyer', 'Garret Sabine', 'Anton Steiger', 'Darwin Voight', 'Arlen McLaren', 'Jarred Tian', 'Willian Koerner', 'Dalton Croyle', 'Avery Watrous', 'Merlin Breton', "Stefan Dilucca", "Dorian Castillon", "Lenard Zephyr", "German Dewitt", "Graham Vanlith", "Keneth Madi", "Walker Madi", "Maxwell Winslett", "Stanton Hewett", "Jonas Burcham", "Ka'Ka", "Ka'Bij", "K'Kahlaa", "Kora", "G'Mpeho", "Kla'Ka", "Katho", "Atak", "Mera", "N'Laworf", "Varik", "Kintha", "Sava", "Sitaur", "Selva", "Sasyv", "Sonak", "Syrrak", "Sakkar", "Sakath"];
var namesFemaleStarTrek = ['Saldia Cornwall', 'Dartitha Darkness', 'Sally Sellsseashells', 'Teisha Raschke', 'Lynna Machesky', 'Rosette Phillips', 'Ai Zemke', 'Vi Sanghvi', 'Veronika Laux', 'Lael Arleth', 'Divina Zavaleta', 'Jennell Warwick', 'Mariella Gammon', "Carylon Beyett", "Mitsue Wyrick", "Lilliam Zechiel", "Phoebe Zephyr", "Laurena Linkovich", "Yuki Dering", "Yuki Jackstadt", "Arlean Alessandro", "Shenna Morgan", "Evelynn Holtz", "Kura", "Tora", "Nara", "B'Tava", "Mira", "Valkra", "G'Tora", "Gira", "Rilka", "Rena", "Asis", "Anadh", "T'Pau", "Thaini", "Heleia", "T'Sai", "Seleia", "Saavei", "T'Madh", "T'Men"];
var racesStarTrek = ['Klingon', 'Human', 'Borg', 'Synthetic Life Form', 'Ferengi', 'Romulan', 'Vulcan', 'Xindi'];
var professionsStarTrek = ['Redshirt', 'Engineer', 'Bartender', 'Trader', 'Pilot', 'Pirate', 'Commanding Officer', 'Doctor', 'Nurse', 'Mercenary', 'Baker', 'Scientist', 'Holophotographer', 'Security Officer', 'Ambassador', 'Chairman', 'Communications Officer', 'Helmsman', 'Professor', 'Weapons Specialist',  'Efficiency Monitor',  'Actor',  'Architect',  'Assassin',  'Arms Dealer',  'Assayer',  'Author',  'Janitor',  'Art Critic',  'Bounty Hunter',  'Businessman',  'Cleric',  'Comedian',  'Courier',  'Diplomat',  'Editor',  'Drama Critic',  'Fortune Teller',  'Homemaker',  'Information Dealer',  'Intelligence Officer',  'Inventor',  'Journalist',  'Junk Dealer',  'Lawyer',  'Logistics Officer',  'Mechanic',  'Merchant',  'Miner',  'Ombudsman',  'Orbital Engineer',  'Ordnance Officer',  'Thief'];

var descriptions = [ 'are huge for your race, and more than a bit crazy. In fact, you drink your own piss while hunting and slaying Hobbits. Also, you ride a buffalo',  'were once a noble, but are now living on the streets. A shadowy figure visited your dream last night and has inspired you to become better', 'were once a pilot but retired after seeing your best friend killed in combat. Now you sulk around your parents\' condo, well, at least until last night, when the Fire Nation attacked',  'are dumb',  'got shot by rebel hobbits from the Ferengi home planet. You were saved by a deer and now seek revenge',  'are tall and scrawny after escaping the desert. Your knowledge of alchemy is all that saved you. Now you are on your own',  'just won the lottery! The problem is, it is the DEATH LOTTERY!!!!',  'just finished law school and everything in life is looking good. Hopefully nothing awful happens to you. OH NO, some dude named Arthur just chopped your limbs off. It is just a flesh wound though',  'are rotund and burdensome to those around you, your only hope is to complete the quest given to you by HIGH LORD ASANKARU',  'took from the rich and gave to the poor',  'loved someone who would never love you back',  'ate a ghost pepper once...  ',  'never enjoyed going outside', 'are living a genuinely happy and fulfilling life', 'have defeated over 100 mercenary bakers', 'keep the place running', 'are a force to be reckoned with', 'are the lone voice of reason in an unreasonable world', 'are firm but fair', 'need to shave', 'are smart', 'could really use a new car because the feds took it away after you used it to cook methamphetamines', 'are hungry', 'need to chill out breh. Go take a chill pill', 'were once a great warrior, but age and injury have brought you down. Now the local lord has requested an audience', 'ate a hamster', 'walked over 500 miles, then walked 500 more', 'defeated the dark ones in single combat, now they haunt your dreams', 'snared a rabbit', 'threw that one ring of power thingy into Mount Doom and are getting bored. How about you go on a quest', 'are wandering the wastes of wysteria and could use a drink. OH look, a tavern', 'are a slaver from Volantis, you add a notch to your belt whenever you enslave a hobbit', 'are tired of existential bullshit', 'are insensitive and more than a bit ornery', 'always need to be the center of attention'];
var quests = [ 'to seek the Holy Grail', 'to destroy thine enemies', 'to destroy the enemies of god', 'to destroy the enemies of atheism', 'to finish paperwork', 'to pass the bar exam', 'to seek Inner Peace', 'to hunt and kill the Wolves of Tyranus', 'to become GOD, emperor of MANKIND', 'to finish Jedi Academy', 'to graduate Starfleet', 'to graduate Epicodus', 'to slay the dragon', 'to defeat the inner demons', 'to cure World Peace', 'to annihilate Jersey Cows', 'to save the ocean', 'to begin RAGNAROK', 'to eat all cake', 'to defeat Sauron and bring peace to all realms', 'to collect all the Pokemon', 'to defeat the demon lord of Volantis',  'to make gobs of money',  'to watch every episode of Dr. Who',  'to find the sword of King Arthur',  'to answer the Ultimate Question of Life, the Universe, and Everything', 'to chill breh', 'to make things great again', 'to invent a time machine so you can fix that thing you did'];
