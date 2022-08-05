import React from 'react';

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };

  return (
    <div
      className='die-face'
      style={styles}
      // Generates the on click for the hold dice function
      onClick={props.holdDice}
    >
      <h2 className='die-number'>{props.value}</h2>
    </div>
  );
}

export default Die;
