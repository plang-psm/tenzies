import React, { useEffect, useState } from 'react';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import Die from './Die';
import Confetti from 'react-confetti';

function Main() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [diceRoll, setDiceRoll] = useState(0);
  const [highscore, setHighscore] = useState(diceRoll);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      // Third party id generator
      id: uuidv4(),
    };
  }

  function allNewDice() {
    // Create an empty array to store values
    const rollArray = [];
    // Loop through 10 times and generate a random #
    for (let i = 0; i < 10; i++) {
      rollArray.push(generateDie());
    }
    // Return the array
    return rollArray;
    // Console log the function
  }

  // Map through our random dice and set them as our values
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      // adds the hold dice function for the die id
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    // If game is not over, keep generating new dice
    if (!tenzies) {
      setDiceRoll((prevRoll) => prevRoll + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDie();
        })
      );
    }
    // If game is over, check high schore and dice roll
    if (tenzies) {
      // If no highscore, set the dice roll as the highscore
      if (highscore === 0) {
        setHighscore(diceRoll);
        // If there is a highscore, check if dice roll is better than the highscore and set as highscore.
      } else if (diceRoll < highscore && highscore > 0) {
        setHighscore(diceRoll);
      }
      // if game is over, reset the dice roll, change tenzies back to false and restart the game once new game is clicked.
      setDiceRoll(0);
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  // Holds the dice by id
  function holdDice(id) {
    // Sets dice to new state
    setDice((oldDice) =>
      // map through the old dice to hold non selected die
      oldDice.map((die) => {
        // if the die id = id then change isHeld when clicked, else leave it
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    // Create a variable to hold all held dies
    const allHeld = dice.every((die) => die.isHeld);
    // Create a varaible for the first value to compare all values
    const firstValue = dice[0].value;
    // Create a variable to compare the first and all values
    const allValues = dice.every((die) => die.value === firstValue);

    if (allHeld && allValues) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div className='main-container'>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className='highscore'>Highscore: {highscore}</p>
      <p className='dice-roll'>Roll: {diceRoll}</p>
      <div className='die-container'>{diceElements}</div>
      <button className='roll-btn' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </div>
  );
}

export default Main;
