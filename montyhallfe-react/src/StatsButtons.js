import React from 'react';


function StatsBlock({statsMode_state, setStatsMode_state, statsObj, setStatsObj, setHistory, getData, statsAction, hist, setHist}){
     var mode_msg = 'Err';
     switch (statsMode_state) {
          case 0:
               mode_msg = 'Switch';
               break;
          case 1:
               mode_msg = 'Stay';
               break;
          case 2:
               mode_msg = 'Random';
               break;
     }
     return (
          <div className='stats'>
          <h3 className='stats__header'></h3>
          <div className='stats__buttons'>
               <button type='button' onClick={() => statsAction('get_change')} className='stats__modeButton'>Change Mode</button>
               <button type='button' onClick={() => statsAction('get')} className='stats__modeButton'>Simulate <br/>({mode_msg})</button>
               <button type='button' onClick={() => statsAction('clr')} className='stats__modeButton'>Reset Chart</button>
          </div>
          </div>
     );
}

export default StatsBlock;