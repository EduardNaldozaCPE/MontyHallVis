import React, {useState} from 'react';
import {jsondata} from './Statdata';
import Stats from './Stats';


var defaultMode = 0;

function StatsBlock(){
     
     const [statsMode_state, setStatsMode_state] = useState(defaultMode)

     const changeMode = () => {
          setStatsMode_state((s) => {
               if (s === 2){
                    return 0;
               } else {
                    return s+1;
               }
          })
     }

     return (
          <div className='stats'>
          <h3 className='stats__header'>STATISTICS</h3>
          <Stats mode={statsMode_state} data={jsondata}/>
          <button type='button' onClick={changeMode} className='stats__modeButton'>Change Mode</button>
          </div>
     );
}

export default StatsBlock;