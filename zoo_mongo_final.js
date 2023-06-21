const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://prabhasbbsc22:91imJFdgSzt9MPaC@cluster0.knfnayg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const prompt = require('prompt-sync')();
class Zoo {
  constructor(animal_name, life_expectancy) {
    this.animal_name = animal_name;
    this.life_expectancy = life_expectancy;
  }
}

class ZooManager {
  constructor() {
    this.animals = [];
    this.client = new MongoClient(uri);
  }

  async connect() {
    await this.client.connect();
    console.log('Connected to MongoDB');
  }

  async disconnect() {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }

  async addAnimal(animal_name, life_expectancy) {
    const animal = new Zoo(animal_name, life_expectancy);
    this.animals.push(animal);

    const database = this.client.db('Zoo');
    const collection = database.collection('animals');

    await collection.insertOne(animal);
    console.log('Animal data stored successfully.');
  }

  async readAnimals() {
    const database = this.client.db('Zoo');
    const collection = database.collection('animals');

    const animals = await collection.find().toArray();
    console.log(animals);
  }
  async updateAnimal(animal_name, new_life_expectancy) {
    const database = this.client.db('Zoo');
    const collection = database.collection('animals');

    await collection.updateOne({ animal_name }, { $set: { life_expectancy: new_life_expectancy } });
    console.log('Animal data updated successfully.');
  }

  async deleteAnimal(animal_name) {
    const database = this.client.db('Zoo');
    const collection = database.collection('animals');

    await collection.deleteOne({ animal_name });
    console.log('Animal data deleted successfully.');
  }
}

async function main() {
  const manager = new ZooManager();

  const n = parseInt(prompt('Enter the number of animals: '));

  await manager.connect();

  for (let i = 0; i < n; i++) {
    const animal_name = prompt(`Enter the name of animal ${i + 1}: `);
    const life_expectancy = parseInt(prompt(`Enter the life expectancy of animal ${i + 1}: `));

    await manager.addAnimal(animal_name, life_expectancy);
  }

  console.log('All animals in the database:');
  await manager.readAnimals();
//   await manager.deleteAnimal(animal_name);
//   await manager.updateAnimal();

  await manager.disconnect();
}

main();
