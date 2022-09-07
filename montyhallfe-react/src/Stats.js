import React from 'react';

const Stats = ({mode, data}) => {
     let wr = parseFloat(data.data.winrate)*100;
     wr = wr.toFixed(2);
     let wins = data.data.correctCount;
     let loss = data.data.wrongCount;
     let icount = data.data.icount;
     var modeStatement = 'No Mode';
     switch (mode) {
          case 0:
               modeStatement = "Always Switch"
               break;
          case 1:
               modeStatement = "No Switch"
               break;
          case 2:
               modeStatement = "All Random"
               break;
          default:
               break;
     }
     return (
       <div className='stats__body'>
         <p className='stats__winstat'>Mode: {modeStatement}</p>
         <p className='stats__winstat'>WR% - {wr}%</p>
         <p className='stats__winstat'>Wins - {wins}</p>
         <p className='stats__winstat'>Losses - {loss}</p>
         <p className='stats__winstat'>Iterations - {icount}</p>
         {/* {console.log(props)} */}
       </div>
     );
}

export default Stats;