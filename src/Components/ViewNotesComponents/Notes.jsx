import React, {useContext, useEffect, useState} from 'react'
import './Notes.css'
import { NotesAppContext } from '../NotesAppContext'
import SubmitButton from '../ViewNotesComponents/SubmitButton.png'

export default function Notes(props) {
    const [currentNotes, setCurrentNotes] = useState("")
    const [storedNotesArray, setStoredNotesArray] = useState([localStorage.getItem(`${props.name}`)])
    const [timeStampArray, setTimeStampArray] = useState([localStorage.getItem(`${props.name}-time`)])    
    const registerNotes = ()=>{
        if(currentNotes!=="" && currentNotes!==',' && currentNotes!==" ") {
        setStoredNotesArray(prev=>([...prev, currentNotes]))
        if(timeStampArray!==',')
        setTimeStampArray(prev=>([...prev, getTime()]))
        }
        setCurrentNotes("")
    }
    const getTime = () => {
        let today = new Date();
        let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+'\n'+time;
        return dateTime
    }

    useEffect(()=>{
        if(localStorage.getItem(`${props.name}`)!=="" && localStorage.getItem(`${props.name}`)!=null) {
        setStoredNotesArray(localStorage.getItem(`${props.name}`).split(','))
        setTimeStampArray(localStorage.getItem(`${props.name}-time`).split(','))
        }
        else {
        setStoredNotesArray([localStorage.getItem(`${props.name}`)])
        setTimeStampArray([localStorage.getItem(`${props.name}-time`)])
        }
    }, [props.name])

    useEffect(()=>{
        localStorage.setItem(`${props.name}`, storedNotesArray)
    }, [storedNotesArray])
    useEffect(()=>{
        localStorage.setItem(`${props.name}-time`, timeStampArray)
    }, [timeStampArray])
  return (
    <div className='Notes'>
        <div className="showNotes">
            <div className='noteStamp'>{
                timeStampArray.map((item, index)=>{
                    return (
                    <div className='individualNotes' key={index}>
                    <span>{item}</span>
                    <span>{storedNotesArray[index]}</span>        
                    </div>)                    
                })
            }</div>
        </div>
        <div className="textpane">
    <textarea
     className="inputArea"
        placeholder="Enter your text here. You can either click the arrow button or press shift+alt to submit."
        autoFocus={true}
        value={currentNotes}
        onChange={(e) => {
        setCurrentNotes(e.target.value);
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey && !e.altKey ) {
        if(!e.target.value.includes(" ")){
            alert ("enter text inside the box");
            return 0
        }
        registerNotes();
      }
    }}
  ></textarea>
            <button type="submit" onClick={registerNotes}>
                <img src={SubmitButton} alt="Submit" />
            </button>
        </div>
    </div>
  )
}

