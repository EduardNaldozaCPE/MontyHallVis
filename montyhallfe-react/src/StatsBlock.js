import React, {useEffect, useState} from 'react';
import {jsondata} from './Statdata';
import Stats from './Stats';
import axios from 'axios';


var defaultMode = 0;
function StatsBlock(){
     
     const [statsMode_state, setStatsMode_state] = useState(defaultMode);
     const [statsObj, setStatsObj] = useState(jsondata);
     const [iters, setIters] = useState(0);

     
     const postIter = async () => {
          axios.post(`http://127.0.0.1:8000/API/score/${statsMode_state}`, {
               mode: toString(statsMode_state),
               act: "iter",
               pasw: "tryme",
               credentials: 'include',
          }).then(function (response) {
               let finalResponse = {'data':response.data.data,'meta':response.data.meta}
               setStatsObj(finalResponse);
          })
          .catch(function(error){
               console.log(error);
          });
          
     }

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

     useEffect(() => {
          postIter();
          console.log("iterating: " + iters);
     }, [iters])

     // statsAction > invokes useEffect[statsMode_state] > invokes getData()
     const statsAction = (a) => {
          if (a === 'get'){
               setStatsMode_state((s) => {
                    if (s === 2){
                         return 0;
                    } else {
                         return s+1;
                    }
               })
          } else if (a === 'iter') {
               setIters(iters+1);
          }
     }


     return (
          <div className='stats'>
          <h3 className='stats__header'>STATISTICS</h3>
          <Stats mode={statsMode_state} data={statsObj}/>
          <div className='stats__buttons'>
               <button type='button' onClick={() => statsAction('get')} className='stats__modeButton'>Change Mode</button>
               <button type='button' onClick={() => statsAction('iter')} className='stats__modeButton'>POST iter</button>
          </div>
          </div>
     );
}

export default StatsBlock;