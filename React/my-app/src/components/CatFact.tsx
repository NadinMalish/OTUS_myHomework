import './CatFact.css'
import { useState } from 'react'

function CatFact() {

    const [dan, setDan] = useState('');
    const [res, setRes] = useState<boolean>(true);
  
    const btnLoad = async () => {
        const response = await fetch(`https://catfact.ninja/fact`);
        const data =  await response.json();  
        setDan(data.fact);  
        setRes(response.ok);
          console.log(dan);
    };

    // let item;
    // if (res){
    //     item = <ItemData msg={dan} />
    // } else {
    //     item = <ErrData />
    // }
  
    
    return (
        <h1>
            <button onClick={btnLoad}> CatFact Loader</button>
            {/* {item} */}
            {res && <ItemData msg={dan} />}
            {!res && <ErrData />}            
        </h1>
    );
  }
  
  function ItemData(props) {
    return(
      <p className='msgItem'>{props.msg}</p>
    );
  }

  function ErrData() {
    return <p className='msgErr'>Ошибка </p>
  }
  
  export default CatFact
  