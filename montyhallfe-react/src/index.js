import React from 'react';
import ReactDom from 'react-dom';
//CSS
import './index.css';
//Components
import StatsBlock from './StatsBlock';

function StatsModule() {
  return (
    <div>
      <StatsBlock/>
    </div>
  );
}

ReactDom.render(<StatsModule/>,document.getElementById('root')); 