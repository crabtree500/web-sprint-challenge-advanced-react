import React, { useState } from 'react';
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    return { x: index % 3, y: Math.floor(index / 3) };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x + 1}, ${y + 1})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    let newIndex = index;
    switch (direction) {
      case 'left':
        if (newIndex % 3 !== 0) newIndex--;
        break;
      case 'right':
        if (newIndex % 3 !== 2) newIndex++;
        break;
      case 'up':
        if (newIndex >= 3) newIndex -= 3;
        break;
      case 'down':
        if (newIndex <= 5) newIndex += 3;
        break;
      default:
        break;
    }
    return newIndex;
  }

  function move(evt) {
    const direction = evt.target.id;
    const newIndex = getNextIndex(direction);
    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1);
      setMessage('');
    } else {
      setMessage('Cannot move in that direction!');
    }
  }
  
  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    
    // Calculate the x and y coordinates based on the current index
    const x = index % 3 + 1;
    const y = Math.floor(index / 3) + 1; 
    
    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Prepare the payload
    const payload = {
      x: x,
      y: y,
      steps: steps,
      email: email
    };
  
    // Send the payload to the server
    fetch('http://localhost:9000/api/result', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(response => {
  if (response.ok) {
    // Handle success
    return response.json(); // Parse response body as JSON
  } else {
    // Handle errors
    throw new Error(response.statusText);
  }
})
.then(data => {
  // Handle successful response data
  setMessage(data.message);
  console.log('Payload sent successfully:', payload);
})
.catch(error => {
  // Handle fetch errors
  console.error('Error sending payload:', error);
});

  }  
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}