import React, { useState } from 'react';
const CountItem = () => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)} style={{ color: 'black', backgroundColor: 'white' }}>
      {count}
    </button>
  )
}
const Hello = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div hidden={!show}>
        <CountItem />
      </div>
      <button onClick={() => setShow(!show)}>Show</button>
    </div>
  )
}
export default Hello;