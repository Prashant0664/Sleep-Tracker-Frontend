import { React, useState } from 'react'
import axios from 'axios';
import { FaGithub, FaInstagram } from 'react-icons/fa'
import SleepGraph from './SleepGraph';
import SleepTable from './Sleettable';
import Stats from './Stats';
const Start = ({ token, name, mail }) => {
  if (!localStorage.getItem("ccstate")) {
    localStorage.setItem("ccstate", false)
  }
  var [state, cstate] = useState(JSON.parse(localStorage.getItem("ccstate")))
  var [aday2, caday2] = useState([])
  var [ahour, cahour] = useState([])
  var [amin, camin] = useState([])
  var [asec, casec] = useState([])
  var [amonth, camonth] = useState([])
  var [ast, cast] = useState([])
  var [aet, caet] = useState([])
  const HandleSubmit = () => {
    const date = new Date();
    var day2 = date.getDate()
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    const cstart = localStorage.getItem("cstart")
    const arr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    var month = arr[date.getMonth()]
    try {

      const data = axios.post('https://sleeptrac101.onrender.com/api/v1/home/main', {
        "name": { name },
        "email": { mail },
        "day": day2,
        "hour": hour,
        "min": min,
        "second": sec,
        "month": month,
        "status": [!state],
        "token": { token },
        "cstart": { cstart }
      }).then((result, err) => {
        if (result) {
          var aresult = result.data
          caday2(aresult.day)
          cahour(aresult.hour)
          camin(aresult.min)
          casec(aresult.second)
          camonth(aresult.month)
          cast(aresult.starttime)
          caet(aresult.endtime)
        }
      })
      localStorage.setItem("cstart", true)
      cstate(state = !JSON.parse(localStorage.getItem("ccstate")));
      localStorage.setItem("ccstate", state)
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='mgr'>
      <SleepGraph ast={ast} />
      <div>
        <div className='fwhite start-cont item3 point'>
          <div className='fwhite start-classs hiddenc2' onClick={HandleSubmit}>
            <div className={state ? 'hidden' : ''}>
              S  T  A  R  T
            </div>
            <div className={state ? 'hidden' : ''}>
              YOUR  SLEEP
            </div>
            <div className={state ? '' : 'hidden'}>
              W  A  K  E  <br />
            </div>
            <div className={state ? '' : 'hidden'}>
              U  P!
            </div>
          </div>
        </div>
        <div className='fwhite start-cont item3 hiddenc3'>
          <div className='start-class' onClick={HandleSubmit}>
            <div className={state ? 'hidden' : ''}>
              S<br />T<br />A<br />R<br />T<br />
            </div>
            <div className={state ? 'hidden' : ''}>
              YOUR <br />SLEEP
            </div>
            <div className={state ? '' : 'hidden'}>
              W<br />A<br />K<br />E<br />
            </div>
            <div className={state ? '' : 'hidden'}>
              U<br />P!<br />
            </div>
          </div>
        </div>

        <div className='slogo'>
          <div className='logo-st'>
            <a href="https://www.github.com/Prashant0664"><FaGithub className='logo-sti' />
            </a> </div>
          <div className='logo-st'>
            <a href="https://www.instagram.com/prashant201103/"><FaInstagram className='logo-sti' />
            </a></div>
        </div>
      </div>
      <SleepTable ahour={ahour} amin={amin} asec={asec} amonth={amonth} ast={ast} aet={aet} email={mail} />
      <Stats ahour={ahour} amin={amin} asec={asec} amonth={amonth} ast={ast} aet={aet} />
    </div>
  )
}

export default Start