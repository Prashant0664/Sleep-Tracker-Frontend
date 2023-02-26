import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useWindowDimensions from './dimension';
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

const SleepGraph = ({ ast }) => {
  data = []
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

  
  
  let ss = data.length;
  for (let ff = ss - 1; ff >= 0; ff--) {
    if (data[ff] === 0) {
      data.pop();
    }
    else {
      break;
    }
  }
  var { height, width } = useWindowDimensions();
  return (
    <>
      <div className='chart-class index item2x'>
        <AreaChart
          width={width<=860?400:460}
          height={width<=860?300:400}
          className='chart-class2'
          data={data}
          // background="black"
          color="white"
          margin={{
            top: 15,
            right: 20,
            left: 2,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" color='white' />
          <XAxis dataKey="name" className='xaxis' color='white' />
          <YAxis />
          <Tooltip />

          <Area color='white' type="monotone" dataKey="T_Time" stroke="red" fill="white" />
        </AreaChart>
      </div>
    </>
  )
}

export default SleepGraph