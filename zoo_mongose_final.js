const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const uri = "mongodb+srv://prabhasbbsc22:91imJFdgSzt9MPaC@cluster0.knfnayg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const zooSchema = new mongoose.Schema({
  animal_name: String,
  life_expectancy: Number
});

const Zoo = mongoose.model('Zoo', zooSchema);

class ZooManager {
  async addAnimal(animal_name, life_expectancy) {
    const animal = new Zoo({ animal_name, life_expectancy });
    await animal.save();
    console.log('Animal data stored successfully.');
  }

  async readAnimals() {
    const animals = await Zoo.find();
    console.log(animals);
  }

  async updateAnimal(animal_name, new_life_expectancy) {
    await Zoo.updateOne({ animal_name }, { life_expectancy: new_life_expectancy });
    console.log('Animal data updated successfully.');
  }

  async deleteAnimal(animal_name) {
    await Zoo.deleteOne({ animal_name });
    console.log('Animal data deleted successfully.');
  }
}

async function main() {
  const manager = new ZooManager();

  const n = parseInt(prompt('Enter the number of animals: '));

  for (let i = 0; i < n; i++) {
    const animal_name = prompt(`Enter the name of animal ${i + 1}: `);
    const life_expectancy = parseInt(prompt(`Enter the life expectancy of animal ${i + 1}: `));

    await manager.addAnimal(animal_name, life_expectancy);
  }

  console.log('All animals in the database:');
  await manager.readAnimals();

  const animalToUpdate = prompt('Enter the name of the animal to update: ');
  const newLifeExpectancy = parseInt(prompt('Enter the new life expectancy: '));
  await manager.updateAnimal(animalToUpdate, newLifeExpectancy);

  const animalToDelete = prompt('Enter the name of the animal to delete: ');
  await manager.deleteAnimal(animalToDelete);

  db.close();
}

main();

