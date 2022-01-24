class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0; //to store the rank of players.

    this.fuel = 185; /*to assign the initial fuel to the player; we will reduce it when the car
    is moving*/    
    this.life = 185; //to assign initial life to the player, we will reduce it in later classes.
    this.score = 0; // to store the score.

  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }

  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd() //to read the value of the CarsAtEnd field from the database.
  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

 /* updateCarsAtEnd() a static to update the CarsAtEnd field with the number of cars that have
finished the race. Static functions are functions that are common to all objects created using
the class.*/

  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank
    });
  }
}
