import { useState } from "react";

const CounterFunc = ({val}: {val: number}) => {

    const [stateVal, setVal] = useState<number>(val);

    const increment = () => {
        setVal(v => ++v);
    };

    const decrement = () => {
        setVal(v => --v);
    };

    return (
        <div>
            <h1>Counter: {stateVal}</h1>
            <button onClick={decrement}>Minus</button>
            <button onClick={increment}>Plus</button>
        </div>
    );

};

export default CounterFunc;