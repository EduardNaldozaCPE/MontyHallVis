import React, {useState} from 'react';
import {jsondata} from './Statdata';
import Stats from './Stats';


var currentMode = 0;

function StatsBlock(){

     const [statsMode_state, setStatsMode_state] = useState(currentMode)
     return (
          <div className='stats'>
          <h3 className='stats__header'>STATISTICS</h3>
          <Stats mode={statsMode_state} data={jsondata}/>
          <button type='button' onClick={() => {
               // console.log('state was :' + currentMode);
               switch (currentMode) {
                    case 0:
                         currentMode=1;
                         break;
                    case 1:
                         currentMode=2;
                         break;
                    case 2:
                         currentMode=0;
                         break;
                    default:
                         break;
               }
               // console.log('state is now: ' + currentMode);
               setStatsMode_state(currentMode);
          }} className='stats__modeButton'>Change Mode</button>
          </div>
     );
}

export default StatsBlock;