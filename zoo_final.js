const prompt = require("prompt-sync")();

class Zoo {
  constructor() {
    this.animal = 0;
    this.animal_name = [];
    this.life_expectancy = [];
    this.years = 0;
    this.aliveAnimals = 0;
  }

  getAnimalDetails() {
    this.animal = parseInt(prompt("Enter the initial animal count:"));
    this.animal_name = prompt("Enter the names of animals (comma-separated):").split(",");
    this.life_expectancy = prompt("Enter the life expectancies of animals (comma-separated):")
      .split(",")
      .map(Number);
  }

  getYears() {
    this.years = parseInt(prompt("Enter the number of years:"));
  }

  calculateAnimalsAfterYears() {
    const totalLifeExpectancy = this.life_expectancy.reduce((acc, curr) => acc + curr, 0);
    const survivalRate = 1 - (1 / totalLifeExpectancy); // Calculate survival rate per year
    this.aliveAnimals = Math.round(this.animal * Math.pow(survivalRate, this.years));
  }

  displayResult() {
    console.log("Number of animals alive after", this.years, "years:", this.aliveAnimals);
  }
}

function main() {
  const myZoo = new Zoo();
  myZoo.getAnimalDetails();
  myZoo.getYears();
  myZoo.calculateAnimalsAfterYears();
  myZoo.displayResult();
}

main();
