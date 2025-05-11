// export default function Tick() {
//     const element = (
//       <div>
//         <h1>Привет, мир!</h1>
//         <h2>Сейчас {new Date().toLocaleTimeString()}.</h2>
//       </div>
//     );
    
//     return (element);
//   }
  
//   setInterval(Tick, 1000);


import { useState } from 'react'

export default function Tick() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(()=>setTime(new Date().toLocaleTimeString()), 1000);

  return <div>
    <h1>Привет, мир!</h1>
    <h2>Сейчас {time}.</h2>
  </div>;
}