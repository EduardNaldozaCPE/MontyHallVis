import axios from 'axios';

export default function montySim(mode) {
     const correctDoor = Math.floor(Math.random() * 3);
     var rChoose = Math.floor(Math.random() * 3);
     var toSwitch, isWin;

     switch (mode) {
          case 0:
               toSwitch = true;
               break;
          case 1:
               toSwitch = false;
               break;
          case 2:
               if (Math.random() >= .5) toSwitch = true; else toSwitch = false;
               break;
          default:
               console.log('Mode Does Not Exist');
               return 1;
     }

     if (toSwitch) {
          switch (rChoose) {
               case 0:
                    if (correctDoor == 0 || correctDoor == 2){
                         // Door 1 becomes unselectable; revealed
                         rChoose = 2;
                    } else if (correctDoor == 1){
                         // Door 2 becomes unselectable; revealed
                         rChoose = 1
                    }
                    break;
               case 1:
                    if (correctDoor == 1 || correctDoor == 2){
                         // Door 0 becomes unselectable; revealed
                         rChoose = 2;
                    } else if (correctDoor == 0){
                         // Door 2 becomes unselectable; revealed
                         rChoose = 0
                    }
                    break;
               case 2:
                    if (correctDoor == 1 || correctDoor == 2){
                         // Door 0 becomes unselectable; revealed
                         rChoose = 1;
                    } else if (correctDoor == 0){
                         // Door 1 becomes unselectable; revealed
                         rChoose = 0
                    }
                    break;
               default:
                    console.log('toSwitch Does Not Exist');
                    return 1;
          }
     }

     if (correctDoor == rChoose) {
          isWin = true
     } else {
          isWin = false
     }
     const final = {'isWin': isWin};
     return getWinLoss(mode, final);
}

async function getWinLoss(mode, result) {
     let putObj;
     axios.get(`http://127.0.0.1:8000/API/score/${mode}`)
     .then(function(response) {
         if (result.isWin) {
               putObj = {'correctCount': response.data.correctCount+1};
          } else {
               putObj = {'wrongCount': response.data.wrongCount+1};
          }
          return putWinLoss(mode,putObj);
     });
     
}

async function putWinLoss(mode, putData) {
     const res = await axios.put(`http://127.0.0.1:8000/API/score/${mode}`, putData);
     return res.data;
}