import React from 'react';
import ReactDom from 'react-dom';
import StatsChart from './StatsChart';
import {jsondata} from './Statdata';
import {useState, useEffect} from 'react';
import axios from 'axios';
//CSS
import './index.css';
//Components
import StatsBlock from './StatsBlock';
import StatsButtons from './StatsButtons';
import montySim from './montysim'


function StatsModule() {
  defaultMode = 0;
  const [statsMode_state, setStatsMode_state] = useState(defaultMode);
  const [statsObj, setStatsObj] = useState(jsondata);
  const [hist, setHist] = useState([[0,0],[0,0],[0,0]]);

  useEffect(() => {
    // getData();
  }, [statsMode_state]);

  // isSwitching: If the user is only switching, don't GET.
  const getData = async (isSwitching) => {
    console.log('\nGET DATA');
    // GET REQUEST TO DJANGO API
    axios.get(`http://127.0.0.1:8000/API/score/${statsMode_state}`)
    .then(function(response) {
      let finalResponse = {'data':response.data}
      // Update statsObj State to display new Data
      setStatsObj(finalResponse);
      // Update hist State; push new winrate_percent to hist nested array
      if (!isSwitching) {
        switch (statsMode_state) {
          case 0:
            setHist((arr) => [[...arr[0], response.data.winrate_percent],[...arr[1]],[...arr[2]]]);
            break;
          case 1:
            setHist((arr) => [[...arr[0]],[...arr[1], response.data.winrate_percent],[...arr[2]]]);
            break;
          case 2:
            setHist((arr) => [[...arr[0]],[...arr[1]],[...arr[2], response.data.winrate_percent]]);
            break;
        }
      }
    })
    .catch(function(error){
         console.log(error);
    });
  } 

// statsAction > invokes useEffect[statsMode_state] > invokes getData()
const statsAction = (a) => {
    if (a === 'get_change'){
      getData(true);
      setStatsMode_state((s) => {
        if (s === 2){
            return 0;
          } else {
            return s+1;
            }
        });
    } else if (a === 'clr') {
         setHist((prevhist)=>{
          let ph = prevhist;
          ph[statsMode_state-1] = [0,0]
          return ph;
         });
    } else if (a === 'get') {
        montySim(statsMode_state);
        getData(false);
    }
  }
  
  var defaultMode = 0;

  return (
    <div>
      <StatsChart statsMode_state={statsMode_state} statsObj={statsObj} hist={hist} setHist={setHist}/>
      <div className='twoColumn'>
        <StatsBlock statsMode_state={statsMode_state} setStatsMode_state={setStatsMode_state} statsObj={statsObj} setStatsObj={setStatsObj} getData={getData}  statsAction={statsAction} hist={hist} setHist={setHist}/>
        <StatsButtons statsMode_state={statsMode_state} setStatsMode_state={setStatsMode_state} statsObj={statsObj} setStatsObj={setStatsObj} getData={getData}  statsAction={statsAction} hist={hist} setHist={setHist}/>
      </div>
    </div>
  );
}

ReactDom.render(<StatsModule/>,document.getElementById('root')); 