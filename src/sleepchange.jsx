import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
const Sleepchange = ({ email, i, j, in1, in2, cs1 }) => {
    var [startDate, setStartDate] = useState(new Date());
    var [endDate, setendDate] = useState(new Date());
    React.useEffect(() => {

        if (i) {
            setStartDate(new Date(in1))
            setendDate(new Date(in2))
        }
        else {

        }
    }, [])

    const submit = () => {
        cs1(false)
        try {
            axios.patch('/api/v1/home/change', {
                i: i, j: j, start: startDate, end: endDate, email: email, in2: in2, in1: in1
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='change-mainss '>
                From: <div className='change-sub'>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => { setStartDate(date); }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm:ss aa"
                        showTimeInput
                    />
                </div>
                To:
                <div className='change-sub'>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => { setendDate(date); }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm:ss aa"
                        showTimeInput
                    />
                </div>
                <button onClick={() => submit()}>Change and Save</button>
            </div>
        </>
    )
}

export default Sleepchange