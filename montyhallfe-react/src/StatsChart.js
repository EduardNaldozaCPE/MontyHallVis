import React, {useEffect, useState, useRef, createContext} from 'react';

function StatsChart({statsMode_state, statsObj, hist, setHist}) {

     const canvasRef = useRef(null);
     const contextRef = useRef(null);

     useEffect(() => {
          let points = hist[statsMode_state];

          const canvas = canvasRef.current;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight/2;
          canvas.style.width = `100%`;
          canvas.style.height = '90%';
          canvas.style.backgroundColor = '#1f1f1f';
          const c = canvas.getContext("2d");
          c.lineCap = "round";
          // MARKERS
          for(let y_mark=0; y_mark<=10; y_mark++){
               c.beginPath();
               const y = (canvas.height*(y_mark/10)*.90)+26.5;
               c.strokeStyle = '#fff';
               c.moveTo(10, y);
               c.lineTo(20, y);
               c.stroke();
               c.strokeStyle = '#333';
               c.lineTo(canvas.width, y);
               c.stroke();
               c.fillStyle = "#aaa"
               c.font = "10px Arial";
               c.fillText(`${(10-y_mark)*10}%`, 10, y-5);

          }

          // CHART
          function charty(time) {
               const ret = ((canvas.height-((canvas.height*.9)*(points[time]/100))))-10;
               return ret;
          }
          c.lineWidth = 2;
          for (let time=0; time<=points.length-1; time++){
               // console.log(time, points.length);
               c.beginPath();
               c.moveTo((time)*((canvas.width/(points.length-1))*.95)+20,charty(time));
               c.lineTo((time+1)*((canvas.width/(points.length-1))*.95)+20,charty(time+1));
               // console.log(points[time+1]);
               // Alternate Line Colour
               if (time%2==0) c.strokeStyle = '#fff'; else c.strokeStyle = '#aaa'
               c.stroke();
          }

          contextRef.current = c;
     }, [hist, statsMode_state])

     return (
          <div className='stats-chart'>
               <h4 className='stats__header'>CHART [WR%]</h4>
               <canvas id='canvas' style={{borderRadius: 10}} ref={canvasRef} />
          </div>
     );
}
export default StatsChart;