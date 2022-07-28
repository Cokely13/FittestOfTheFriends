import React, {useState, useEffect} from "react";
import axios from "axios";

const Counter  = () => {

  const initialState = 0
  const [count, setCount ] = useState(initialState)

  return (
    <div>
     <h1>{count}</h1>
     <button onClick={()=>setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default Counter;
