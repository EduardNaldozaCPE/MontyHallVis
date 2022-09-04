import React from 'react';
import ReactDom from 'react-dom';
//CSS
import './index.css';

const jsondata = {
  "data": {
      "_state": "<django.db.models.base.ModelState object at 0x0000025997E04C70>",
      "avg": "0.00",
      "correctCount": 0,
      "count": 0,
      "id": 1,
      "winrate": "0.00",
      "wrongCount": 0
  },
  "meta": {
      "datetime": "2022-09-04 15:58:21.115334",
      "user": "AnonymousUser"
  }
}

function StatsBlock(){
  return (
    <div className='stats'>
      <h3 className='stats__header'>STATISTICS</h3>
        <Stats mode={1} data={jsondata}/>
      </div>
  );
}

const Stats = (props) => {
  let wr = jsondata.data.winrate;
  let wins = jsondata.data.correctCount;
  let loss = jsondata.data.wrongCount;
  var modeStatement = 'No Mode';
  if (props.mode == 0){
    modeStatement = "Always Switch"
  } else if (props.mode == 1) {
    modeStatement = "No Switch"
  } else {
    modeStatement = "All Random"
  }
  
  return (
    <div className='stats__body'>
      <p className='stats__winstat'>Mode: {modeStatement}</p>
      <p className='stats__winstat'>WR% - {wr}%</p>
      <p className='stats__winstat'>Wins - {wins}</p>
      <p className='stats__winstat'>Losses - {loss}</p>
      {console.log(props)}
    </div>
  );
};

ReactDom.render(<StatsBlock/>,document.getElementById('root')); 