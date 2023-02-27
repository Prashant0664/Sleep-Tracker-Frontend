import React, { useState } from 'react'
import axios from 'axios';
import Sleepchange from './sleepchange';

const Sleettable = ({ aday2, ahour, amin, asec, amonth, ast, aet, email }) => {
    var data = ""
    const datearr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const runni = () => {

        // try {
        //     const dde = axios.post('https://sleeptrac101.onrender.com/api/v1/home/getd', {
        //         email: email,
        //     })
        //         .then((res, err) => {
        //             if (err) {
        //                 console.log( err)
        //             }
        //             else {
        //                 ast = res.data.arrey
        //             }
        //         })
        // } catch (error) {
        //     console.log( error)
        // }
    }
    runni()
    React.useEffect(() => {
    }, [localStorage.getItem("status")])
    data = ""
    var arr = [];
    var h = 0;
    var s = ast.length;
    if (s % 2 != 0) {
        s--;
    }
    for (let i = 0; i < s; i += 2) {
        var d1 = new Date(ast[i]);
        var d2 = new Date(ast[i + 1]);
        arr[h] = {
            in1: i,
            in2: i + 1,
            dd1: d1,
            delt1: ast[i],
            delt2: ast[i + 1],
            dd2: d2,
            day: d1.getDate(),
            month: datearr[eval(d1.getMonth())],
            hour: d1.getHours(),
            min: d1.getMinutes(),
            sec: d1.getSeconds(),
            day2: d1.getDate(),
            month2: datearr[eval(d2.getMonth())],
            hour2: d2.getHours(),
            min2: d2.getMinutes(),
            sec2: d2.getSeconds(),
            diff: eval(eval(((d2 - d1) / (1000 * 60)).toFixed(3)))
        }
        h++;
    }

    arr.reverse()
    var arrays = [1, 2, 3, 4, 5]
    const DeleteH = async (date, date2, in1, in2) => {

        try {
            const dd = await axios.patch('https://sleeptv1back.onrender.com/api/v1/home/del', {
                email: email,
                est1: date,
                est2: date2,
                in1: in1,
                in2: in2
            },)
        } catch (error) {
            console.log( error)
        }
    }

    var [s1, cs1] = useState(false)
    var [s2, cs2] = useState("")
    var [s3, cs3] = useState("")
    var [s4, cs4] = useState("")
    var [s5, cs5] = useState("")
    function changes(email, i, j, in1, in2) {
        cs1(!s1)
        cs2(i)
        cs3(j)
        cs4(in1)
        cs5(in2)
    }
    function Showd(array) {
        return (
            array.array.map((i) => (

                <p key={Math.random()} className='ptable'><b>{i.day}/{i.month}</b> from {i.hour}:{i.min}:{i.sec} to <b>{i.day2}/{i.month2}</b> {i.hour2}:{i.min2}:{i.sec2}
                    <br />
                    {i.diff} mins<br />
                    <button className='tbutton' onClick={()=>changes(i.email, i.in1, i.in2, i.delt1, i.delt2)}>Edit</button>+
                    <button className='tbutton' onClick={() => DeleteH(i.delt1, i.delt2, i.in1, i.in2)}>Delete</button></p>
            ))
        )
    }
    return (
        <>
            <div className='sleeptable itemhh'>
                <div className='sleet-data'>
                    <div className={ast.length > 0 ? 'main-table' : 'hidden'}>
                        {ast.length > 0 ? <Showd array={arr} /> : ''}
                    </div>
                </div>
            </div>
            <div className={s1 ? '' : 'hidden'}>
                <Sleepchange email={email} i={s2} j={s3} in1={s4} in2={s5} cs1={cs1}/>
            </div>
        </>
    )
}

export default Sleettable









