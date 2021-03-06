import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { ResetContext } from './GenerateRandomLetter'
import 'reactjs-popup/dist/index.css';

/*
Clock is a child of generateRandomLetter. 
The timer starts only when the initial seconds is set to higher value than zero. 
*/


function reloadPage(){ 
    window.location.reload(false);
}

const Clock = (props) => {

    const resetContext = useContext(ResetContext)
    const {initialSeconds = 0} = props;
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [reset, setReset ] =  useState(false);
    const [clockStarted, setClockStarted ] =  useState(false);

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {              
                setSeconds(seconds - 1);
                setClockStarted(true)
            }
            if (seconds === 0) {
                if(clockStarted){
                    reloadPage()
                    alert('Time ran out!!!!')
                }
                clearInterval(myInterval)
            }
            if(reset !== resetContext){                
                setReset(resetContext) 
                setSeconds(initialSeconds)
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { seconds === 0
            ?  null
            : <h1>time left: 00:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Clock;