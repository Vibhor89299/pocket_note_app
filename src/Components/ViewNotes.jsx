import React, {useState, useEffect} from 'react'
import './ViewNotes.css'
import DefaultImage from './assets/DefaultImage.png'
import Navbar from './ViewNotesComponents/Navbar'
import Notes from './ViewNotesComponents/Notes'

export default function ViewNotes(props) {
  const [changeView, setChangeView] = useState(false)
  useEffect(()=>{
    setChangeView(props.changeViewNotes)
  }, [props.changeViewNotes])
  return (
    (changeView) ?
    <div className='CustomView'>
      <Navbar name={props.changeViewNotes}/>
      <Notes name={props.changeViewNotes}/>
    </div> :
    <div className='DefaultView'>
        <img src={DefaultImage} alt="Pocket Notes"/>
        <p>Pocket Notes</p>
        <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
    </div>
  )
}


function handleViewNotesChange(GroupName) {
  
}

export { handleViewNotesChange }
