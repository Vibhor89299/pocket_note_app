import React, {useState, useEffect, useRef} from 'react'
import './CreateGroupPopUp.css'
import ReactModal from 'react-modal'

export default function CreateGroupPopUp(props) {
    const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]
    const [chosenColor, setChosenColor] = useState("")
    const [chosenName, setChosenName] = useState("")
    const [disabled, setDisabled] =useState(false)
  return (
    <ReactModal isOpen={props.isSelected} contentLabel='CreateGroupPopup' className='CG_PopUp'>
        <button onClick={()=>props.setSelected(false)}>X</button>
        <h3>Create New Notes Group</h3>
        <label htmlFor="GroupName">
        Group Name: <input type="text" name='GroupName' id='GroupName' placeholder='Enter your group name....' value={chosenName}
        onChange={(e)=>{
            setChosenName(e.target.value)
        }}/>
        </label>
        <label htmlFor='GroupColor'>Choose Color:
        {
            (chosenColor=="")? 
            colors.map((item, index) => (
                <input style={{background:`${item}`}} onClick={()=>{
                    setChosenColor(`${item}`)
                    setDisabled(true)
                }} key={index} type='button' disabled={disabled}/>
             ))
            :
            <>
            <input style={{background: `${chosenColor}`}} type="button" onClick={()=>{
                    setDisabled(false)
                    setChosenColor("")
            }}/>
            <p style={{color: `${chosenColor}`, fontWeight: 200, position: "relative", left: "0.5rem", cursor: "pointer"}} onClick={()=>{
                setDisabled(false)
                setChosenColor("")
            }}>Chose wrong? Click on me to select again!</p>
            </> 
        }
        </label>
        <button onClick={()=>{
            if(chosenName == '' || chosenColor == '')
            alert("Please choose a name or a color!") //TODO: Implement a better UI
            else {
            props.Implement(chosenName, chosenColor)
            props.setSelected(false)
        }
        }}>Create</button>
    </ReactModal>
  )
}
