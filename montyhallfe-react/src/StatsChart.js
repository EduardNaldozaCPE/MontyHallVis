import React, {useEffect, useState, useRef} from 'react';
import Stats from './Stats';

function StatsChart({statsMode_state, statsObj, history, setHistory}) {

     const canvasRef = useRef(null);
     const contextRef = useRef(null);

     useEffect(() => {
          let points = history

          const canvas = canvasRef.current;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight/2;
          canvas.style.width = `100%`;
          canvas.style.height = '90%';
          canvas.style.backgroundColor = '#1f1f1f';
          const c = canvas.getContext("2d");
          c.lineCap = "round";
          // MARKERS


          // CHART
          function charty(time) {
               return ((canvas.height-((canvas.height*.9)*(points[time]/100))))-20;
          }
          c.lineWidth = 2;
          for (let time=0; time<points.length; time++){
               c.beginPath();
               c.moveTo((time)*((canvas.width/(points.length-1))*.95)+20,charty(time));
               c.lineTo((time+1)*((canvas.width/(points.length-1))*.95)+20,charty(time+1));
               c.strokeStyle = '#ffffff';
               c.stroke();
          }

          contextRef.current = c;
     })

     return (
          <div className='stats-chart'>
               <h3 className='stats__header'>CHART</h3>
               <canvas id='canvas' ref={canvasRef} />
          </div>
     );
}
export default StatsChart;