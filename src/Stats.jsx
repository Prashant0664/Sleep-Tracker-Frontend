import React from 'react'

var data = [
  {
    name: 'Page A',
    T_Time: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    T_Time: 3000,
    pv: 1398,
    amt: 2210,
  },
];
const Stats = ({ ahour, amin, asec, amonth, ast, aet }) => {

  var data = []
  var h = 0;
  if (ast.length === 1) {

  }
  else {
    data[h] = {
      name: `${(new Date(ast[0])).getDate()}/${(new Date(ast[0])).getMonth() + 1}`,
      T_Time: eval(((new Date(ast[1])) - (new Date(ast[0]))) / (1000 * 60).toFixed(3))
    }
  }
  if (ast.length > 2) {
    if (ast.length % 2 === 0) {
      for (let i = 2; i < ast.length; i += 2) {
        if ((new Date(ast[i])).getDate() === (new Date(ast[i - 2])).getDate()) {
          data[h].T_Time = eval(data[h].T_Time) + eval(((new Date(ast[i + 1])) - (new Date(ast[i]))) / (1000 * 60).toFixed(3))
        }
        else {
          h++;
          data[h] = {
            name: `${(new Date(ast[i])).getDate()}/${(new Date(ast[i])).getMonth() + 1}`,
            T_Time: eval(((new Date(ast[i + 1])) - (new Date(ast[i]))) / (1000 * 60).toFixed(3))
          }
        }
      }
    }
    else {
      if (ast.length % 2 === 0) {
        for (let i = 2; i < ast.length - 1; i += 2) {
          if ((new Date(ast[i])).getDate() === (new Date(ast[i - 2])).getDate()) {
            data[h].T_Time = eval((data[h].T_Time) + eval((new Date(ast[i + 1])) - (new Date(ast[i]))) / (1000 * 60))
          }
          else {
            h++;
            data[h] = {
              name: `${(new Date(ast[i])).getDate()}/${(new Date(ast[i])).getMonth() + 1}`,
              T_Time: eval(((new Date(ast[i + 1])) - (new Date(ast[i]))) / (1000 * 60))
            }
          }
        }
      }
    }
  }
// "proxy": "http://localhost:5000",

  var stod = 0;
  var avg = "HAPPY DREAMS!☺";
  var min = "HAPPY DREAMS!☺";
  var max = "HAPPY DREAMS!☺";
  var tod = "HAPPY DREAMS!☺";
  var msg = "HAPPY DREAMS!☺";
  if (data.length > 1) {
    var m = 9999999999;
    var mm = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].T_Time < m) {
        m = data[i].T_Time
      }
      if (data[i].T_Time > mm) {
        mm = data[i].T_Time
      }
    }
    min = m.toFixed(3) + ' mins'
    max = mm.toFixed(3) + ' mins'
    stod = data[data.length - 1].T_Time.toFixed(3)
    tod = data[data.length - 1].T_Time.toFixed(3) + ' mins';
    var sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].T_Time
    }
    avg = (sum / data.length).toFixed(3) + ' mins'
  }

  if (stod < (7 * 60)) {
    msg = "YOU NEED MORE SLEEP"
  }
  else if (stod > (9 * 60)) {
    msg = "YOU OVERSLEPT TODAY"
  }
  else {
    msg = "What you do today can improve your tomorrow"
  }



  let ss = data.length;
  for (let ff = ss - 1; ff >= 0; ff--) {
    if (data[ff] === 0) {
      data.pop();
    }
    else {
      break;
    }
  }



  return (
    <div className='fwhite stat-main itemxx'>
      <div className='stat-sub'>
        <b>AVERAGE SLEEP</b> : {avg}<br />
        <b>MINIMUM</b> : {min}<br />
        <b>MAXIMUM</b> : {max}<br />
        <b>TODAY'S SLEEP TOTAL</b> : {tod}<br />
        <i>{msg}!</i><br />
      </div>
    </div>
  )
}

export default Stats