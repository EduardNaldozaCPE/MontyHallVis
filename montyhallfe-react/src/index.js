import React, {useEffect, useState} from 'react';
import {jsondata} from './Statdata';
import ReactDom from 'react-dom';
import StatsChart from './StatsChart'
//CSS
import './index.css';
//Components
import StatsBlock from './StatsBlock';
import StatsButtons from './StatsButtons';

function StatsModule() {
  
  var defaultMode = 0;
  
  const [statsMode_state, setStatsMode_state] = useState(defaultMode);
  const [statsObj, setStatsObj] = useState(jsondata);
  const [history, setHistory] = useState([0,0]);

  return (
    <div>
      <StatsChart statsMode_state={statsMode_state} statsObj={statsObj} history={history} setHistory={setHistory}/>
      <div className='twoColumn'>
        <StatsBlock statsMode_state={statsMode_state} setStatsMode_state={setStatsMode_state} statsObj={statsObj} setStatsObj={setStatsObj} setHistory={setHistory}/>
        <StatsButtons statsMode_state={statsMode_state} setStatsMode_state={setStatsMode_state} statsObj={statsObj} setStatsObj={setStatsObj} setHistory={setHistory}/>
      </div>
    </div>
  );
}

ReactDom.render(<StatsModule/>,document.getElementById('root')); 