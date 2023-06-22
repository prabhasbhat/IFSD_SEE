import React, { useState } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';

const ZooApp = () => {
  const [animalCount, setAnimalCount] = useState(0);
  const [animalNames, setAnimalNames] = useState('');
  const [lifeExpectancies, setLifeExpectancies] = useState('');
  const [years, setYears] = useState(0);
  const [aliveAnimals, setAliveAnimals] = useState(0);

  const handleAnimalCountChange = (event) => {
    setAnimalCount(parseInt(event.target.value));
  };

  const handleAnimalNamesChange = (event) => {
    setAnimalNames(event.target.value);
  };

  const handleLifeExpectanciesChange = (event) => {
    setLifeExpectancies(event.target.value);
  };

  const handleYearsChange = (event) => {
    setYears(parseInt(event.target.value));
  };

  const calculateAnimalsAfterYears = () => {
    const animalNamesArray = animalNames.split(',');
    const lifeExpectanciesArray = lifeExpectancies.split(',').map(Number);
    const totalLifeExpectancy = lifeExpectanciesArray.reduce((acc, curr) => acc + curr, 0);
    const survivalRate = 1 - 1 / totalLifeExpectancy;
    const aliveAnimalsCount = Math.round(animalCount * Math.pow(survivalRate, years));
    setAliveAnimals(aliveAnimalsCount);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateAnimalsAfterYears();
  };

  return (
    <div>
      <h1>Zoo App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Initial Animal Count:
          <input type="number" value={animalCount} onChange={handleAnimalCountChange} />
        </label>
        <br />
        <label>
          Animal Names (comma-separated):
          <input type="text" value={animalNames} onChange={handleAnimalNamesChange} />
        </label>
        <br />
        <label>
          Life Expectancies (comma-separated):
          <input type="text" value={lifeExpectancies} onChange={handleLifeExpectanciesChange} />
        </label>
        <br />
        <label>
          Number of Years:
          <input type="number" value={years} onChange={handleYearsChange} />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      <p>Number of animals alive after {years} years: {aliveAnimals}</p>
    </div>
  );
};

export default ZooApp;
