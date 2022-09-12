import React, {useEffect, useState} from 'react';
import Stats from './Stats';
import axios from 'axios';


function StatsBlock({statsMode_state, setStatsMode_state, statsObj, setStatsObj, setHistory}){

     const getData = async () => {
          axios.get(`http://127.0.0.1:8000/API/score/${statsMode_state}`)
          .then(function(response) {
               let finalResponse = {'data':response.data}
               setStatsObj(finalResponse);
               setHistory((prevHistory) => {
                    let h = prevHistory
                    h.push(response.data.winrate_percent);
                    return h
               })
          })
          .catch(function(error){
               console.log(error);
          });
     }

     useEffect(() => {
          getData();
          console.log("mode selected: " + statsMode_state);
     }, [statsMode_state])


     // statsAction > invokes useEffect[statsMode_state] > invokes getData()
     const statsAction = (a) => {
          if (a === 'get_change'){
               setStatsMode_state((s) => {
                    if (s === 2){
                         return 0;
                    } else {
                         return s+1;
                    }
               })
          } else if (a === 'iter') {
               // postStatsz('iter');
          } else if (a === 'get') {
               getData();
          }
     }

     // SETINTERVAL
     useEffect(() => {
          const interval = setInterval(() => {
               statsAction('get')
          }, 2000);
          return () => clearInterval(interval);
        }, [statsMode_state]);

     return (
          <div className='stats'>
          <h3 className='stats__header'></h3>
          <div className='stats__buttons'>
               <button type='button' onClick={() => statsAction('get_change')} className='stats__modeButton'>Change Mode</button>
               <button type='button' onClick={() => statsAction('iter')} className='stats__modeButton'>POST iter</button>
               <button type='button' onClick={() => statsAction('get')} className='stats__modeButton'>GET</button>
          </div>
          </div>
     );
}

export default StatsBlock;