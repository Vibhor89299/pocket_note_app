import React, {useState, useEffect} from 'react'
import {handleViewNotesChange} from './ViewNotes'

export default function Group(props) {
    let [GroupShort, setGroupShort] = useState("")
    let [GroupName, setGroupName] = useState(`${props.children}`)
    let [Selected, setSelected] = useState({display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
    fontSize: "1rem",
    fontFamily: 'Roboto',
    alignItems: "center",
    fontWeight: 'bold',
    position: 'relative',
    left: '5%',
    cursor: 'pointer', 
    background: "#F7ECDC",
    borderRadius: " 32px 0px 0px 32px"})
    useEffect(()=>{
        if(props.children!='') 
            setGroupShort(()=>(
                props.children.substring(0, 2).toUpperCase()
            ))
    }, [])
    let groupStyle = {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        fontSize: "1rem",
        fontFamily: 'Roboto',
        alignItems: "center",
        fontWeight: 'bold',
        position: 'relative',
        left: '5%',
        cursor: 'pointer', 
        background: "inherit"
    }
    let buttonStyle = {
        width: '3rem',
        height: '3rem',
        borderRadius: '100%',
        background: props.color,
        border: 'none',
        display: 'inline-block',
        fontSize: '1rem',
        color: '#fff',
        textAlign: 'center',
        cursor: 'pointer'
    }
    const ChangeViewNotes = () => {
        props.setSelectedGroupName(`${props.children}`)
        props.setChangeViewNotes(GroupName)
    }
  return (
    <div style={(props.isSelected)? Selected : groupStyle} onClick={ChangeViewNotes}>
        <button style={buttonStyle}>{GroupShort}</button>
        <span>&nbsp;&nbsp;&nbsp;</span>
        {props.children}
    </div>
  )
}
