import React, {useState, useEffect, useContext} from 'react'
import Group from './Group'
import CreateGroupPopUp from './CreateGroupPopUp'
import './Pane.css'
import { NotesAppContext } from './NotesAppContext' 

export default function Pane(props) {
  const {allGroups, setAllGroups} = useContext(NotesAppContext)
  const [isCreateGroupSelected, setIsCreateGroupSelected] = useState(false)
  const [Groups, setGroups ] = useState(allGroups)
  const [SelectedGroupName, setSelectedGroupName] = useState("")

  const CreateGroup = ()=>(setIsCreateGroupSelected(true))
  const ImplementGroup = (chosenName, chosenColor)=>{
    setGroups(prev=>({...prev, [chosenName]: {chosenName, chosenColor}}))
  }


  useEffect(()=>{
    setAllGroups(Groups)
    localStorage.setItem("Groups", JSON.stringify(Groups))
  }, [Groups] ) 
  
  return (
    <div className='Pane'>
        <h1>Pocket Notes</h1>
        <button onClick={CreateGroup} className='P_CreateNotes'><span style={{fontWeight: 'bold', fontSize: '1.5rem'}}>+</span> &nbsp;&nbsp; Create Notes Group</button>
        <div className='Groups'>
        {
          Groups && Object.values(Groups).map(
            (item, key) => (
              <Group color={item.chosenColor}  key={key} isSelected={SelectedGroupName===(item.chosenName)}  setSelectedGroupName={setSelectedGroupName} setChangeViewNotes={props.setChangeViewNotes}>{item.chosenName}</Group>
            )
          )
        }        
        {isCreateGroupSelected && <CreateGroupPopUp setSelected={setIsCreateGroupSelected} isSelected={isCreateGroupSelected} Implement={ImplementGroup}/>}   
        </div>
    </div>
  )
}

