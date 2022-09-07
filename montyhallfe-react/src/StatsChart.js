import React, {useEffect, useState} from 'react';
import Stats from './Stats';

function StatsChart({statsMode_state, setStatsMode_state, statsObj, setStatsObj}) {
     return (
          <div className='stats-chart'>
               <h3 className='stats__header'>CHART</h3>
               <p>{statsMode_state}</p>
               <p>{statsObj.data.correctCount}</p>
               <p>{statsObj.data.wrongCount}</p>
               <p>{statsObj.data.wr}</p>
               <p>{statsObj.data.icount}</p>
          </div>
     );
}
export default StatsChart;