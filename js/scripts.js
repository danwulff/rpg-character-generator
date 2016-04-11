//Business Logic
//----------------------------------------
function Character(characterName, age, realm, race, profession){
  this.name = characterName;
  this.age = age;
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

//Randomize function
function randomize(charObj) {
  if (charObj.name === '') {
    charObj.name = charObj.random(names);
  }
  if (charObj.age === '') {
    charObj.age = charObj.random(ages);
  }
  if (charObj.realm === '') {
    charObj.realm = charObj.random(realms);
  }
  if (charObj.race === '') {
    charObj.race = charObj.random(races);
  }
  if (charObj.profession === '') {
    charObj.profession = charObj.random(professions);
  }
}

//User Interface Logic
//----------------------------------------
$(document).ready(function() {
  $("#submitCharacter").submit(function(event){
    event.preventDefault();

    var characterName = $('#characterName').val();
    var newCharacter = new Character($('#characterName').val(), $('#age').val(), $('#realm').val(), $('#race').val(), $('#profession').val())

    randomize(newCharacter);
    console.log(newCharacter);
  });

});




//Library
//----------------------------------------
var realms = ['Middle Earth', 'Modern Earth', 'Warhammer 40K']
var names = ['Tim the Enchanter', 'Snarf the Thundercat', 'George Constanza']
var ages = ['Young', 'Middle-aged', 'Old']
var races = ['Dwarf', 'Elf', 'Goblin', 'Human', 'Ent', 'Kobold', 'Orc', 'Hobbit']
var professions = ['Baker', 'Mercenary', 'Ruler', 'Cabbie', 'CIA Operative']
var descriptions = ['has slain 500 orcs', 'has baked over 100 cakes', 'has defeated over 100 mercenary bakers']
var quests = ['to seek the holy grail', 'to annoy the felonius Monk', 'to bake 101 cakes']
