//Business Logic
//----------------------------------------
function Character(characterName, age, realm, race, profession){
  this.name = characterName;
  this.age = age;
  this.realm = realm;
  this.race = race;
  this.profession = profession;
  this.description;
  this.quest;
}

//User Interface Logic
//----------------------------------------
$(document).ready(function() {
  $("#submitCharacter").submit(function(event){
    event.preventDefault();

    var characterName = $('#characterName').val();
    var newCharacter = new Character($('#characterName').val(), $('#age').val(), $('#realm').val(), $('#race').val(), $('#profession').val())
    console.log(newCharacter);
  });

});




//Library
//----------------------------------------
