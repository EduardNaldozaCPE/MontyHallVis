import React, {useEffect, useState} from 'react';
import Stats from './Stats';
import axios from 'axios';


function StatsBlock({statsMode_state, setStatsMode_state, statsObj, setStatsObj}){


     // const [statsMode_state, setStatsMode_state] = useState(defaultMode);
     // const [statsObj, setStatsObj] = useState(jsondata);

     // async function postData(url = '', data = {}) {
     //      // Default options are marked with *
     //      const response = await fetch(url, {
     //           method: 'POST', // *GET, POST, PUT, DELETE, etc.
     //           mode: 'no-cors', // no-cors, *cors, same-origin
     //           cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     //           credentials: 'include', // include, *same-origin, omit
     //           headers: {
     //           'Content-Type': 'application/json'
     //           // 'Content-Type': 'application/x-www-form-urlencoded',
     //           },
     //           redirect: 'follow', // manual, *follow, error
     //           referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     //           body: JSON.stringify(data) // body data type must match "Content-Type" header
     //      });
     //      return response.json(); // parses JSON response into native JavaScript objects
     // }

     // const postIter = async () => {
     //      const tempP = {
     //           mode: statsMode_state,
     //           act: "clear",
     //           pasw: "tryme",
     //      }
     //      const requestOptions = {
     //           method: 'POST',
     //           headers: { 'Content-Type': 'application/json' },
     //           body: JSON.stringify(tempP),
     //       };
       
     //      await fetch(`http://127.0.0.1:8000/API/score/${statsMode_state}`, requestOptions)
     //      .then((response) => response.json())
     //      .then((data) => setStatsObj(data))
     // }

     const postStatsz = async (act) => {
          var bodyFormData = new FormData();
          bodyFormData.append('mode', statsMode_state);
          bodyFormData.append('pasw', 'tryme');
          bodyFormData.append('act', act);
          axios({
               method: "post",
               url: `http://127.0.0.1:8000/API/score/${statsMode_state}`,
               data: bodyFormData,
               headers: { "Content-Type": "multipart/form-data" },
             })
          .then(function(response) {
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
               postStatsz('iter');
          } else if (a === 'clear') {
               postStatsz('clear');
          }
     }

     // SETINTERVAL
     useEffect(() => {
          const interval = setInterval(() => {
               // statsAction('iter')
          }, 500);
          return () => clearInterval(interval);
        }, []);

     return (
          <div className='stats'>
          <h3 className='stats__header'>STATISTICS</h3>
          <Stats mode={statsMode_state} data={statsObj}/>
          <div className='stats__buttons'>
               <button type='button' onClick={() => statsAction('get')} className='stats__modeButton'>Change Mode</button>
               <button type='button' onClick={() => statsAction('iter')} className='stats__modeButton'>POST iter</button>
               <button type='button' onClick={() => statsAction('clear')} className='stats__modeButton'>POST clear</button>
          </div>
          </div>
     );
}

export default StatsBlock;