import React, {useEffect, useState} from 'react';
import {jsondata} from './Statdata';
import Stats from './Stats';
import axios from 'axios';


var defaultMode = 0;
function StatsBlock(){
     
     const [statsMode_state, setStatsMode_state] = useState(defaultMode);
     const [statsObj, setStatsObj] = useState(jsondata);

     const getData = async () => {
          axios.get(`http://127.0.0.1:8000/API/score/${statsMode_state}`)
          .then(function(response) {
               let finalResponse = {'data':response.data.data,'meta':response.data.meta}
               setStatsObj(finalResponse);
          })
          .catch(function(error){
               console.log(error);
          });
     }

     useEffect(() => {
          getData();
          console.log("mode selected: " + statsMode_state);
     }, [statsMode_state])

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
          <Stats mode={statsMode_state} data={statsObj}/>
          <div className='stats__buttons'>
               <button type='button' onClick={changeMode} className='stats__modeButton'>Change Mode</button>
               <button type='button' onClick={getData} className='stats__modeButton'>GET request</button>
          </div>
          </div>
     );
}

export default StatsBlock;