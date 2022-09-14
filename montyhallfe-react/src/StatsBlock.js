import React, {useEffect, useState} from 'react';
import Stats from './Stats';


function StatsBlock({statsMode_state, setStatsMode_state, statsObj, setStatsObj, setHistory, getData, statsAction, hist, setHist}){

     
     // SETINTERVAL
     // useEffect(() => {
     //      const interval = setInterval(() => {
     //           getData();
     //      }, 2000);
     //      return () => clearInterval(interval);
     //    }, [statsMode_state]);

     return (
          <div className='stats'>
               <h4 className='stats__header'>STATISTICS</h4>
               <br/>
               <Stats mode={statsMode_state} data={statsObj}/>
               <br/>
          </div>
     );
}

export default StatsBlock;