import React, {useEffect, useState} from 'react';
import {jsondata} from './Statdata';
import ReactDom from 'react-dom';
import StatsChart from './StatsChart'
//CSS
import './index.css';
//Components
import StatsBlock from './StatsBlock';

function StatsModule() {
  
  var defaultMode = 0;
  
  const [statsMode_state, setStatsMode_state] = useState(defaultMode);
  const [statsObj, setStatsObj] = useState(jsondata);

  return (
    <div>
      <StatsChart statsMode_state={statsMode_state} setStatsMode_state={setStatsMode_state} statsObj={statsObj} setStatsObj={setStatsObj}/>
      <StatsBlock statsMode_state={statsMode_state} setStatsMode_state={setStatsMode_state} statsObj={statsObj} setStatsObj={setStatsObj}/>
    </div>
  );
}

ReactDom.render(<StatsModule/>,document.getElementById('root')); 