import React, { useState } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Ouch: email must be a valid email')
    .required('Ouch: email is required')
    .max(100, 'Ouch: email must be under 100 chars'), 
})

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
      setMessage(`You can't go ${direction}`);
    }
  }
  
  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const x = index % 3 + 1;
        const y = Math.floor(index / 3) + 1;
        const payload = { x, y, steps, email };
    const code = (((x + 1) * (y + 2)) * (steps + 1)) + email.length
  if (email === 'foo@bar.baz') {
    setMessage(`foo@bar.baz failure #${code}`)
  }
    schema.validate({ email })
      .then(() => {
        
  
        
  
        fetch('http://localhost:9000/api/result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response.statusText);
            }
          })
          .then(data => {
           
            setMessage(data.message);
            console.log('Payload sent successfully:', payload);
            setEmail(initialEmail)
          })
          .catch(error => {
            console.error('Error sending payload:', error);
          });
      })
      .catch(validationError => {
  
        if (validationError.inner.some(err => err.path === 'email')) {
          setMessage(validationError.inner.find(err => err.path === 'email').message); // Display the validation error message for email
        } else {
          setMessage(validationError.message);
        }
      });
  }
  
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
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