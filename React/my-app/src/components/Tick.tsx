export default function Tick() {
    const element = (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    
    return (element);
  }
  
  setInterval(Tick, 1000);