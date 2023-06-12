import React, {useState} from 'react'
import Pane from './Components/Pane'
import ViewNotes from './Components/ViewNotes'
import './App.css'
import './Components/NotesAppContext'
import { NotesAppContext } from './Components/NotesAppContext'

export default function App() {
  const [changeViewNotes, setChangeViewNotes] = useState("")
  const [allGroups, setAllGroups] = useState(JSON.parse(localStorage.getItem("Groups")))
  return (
  <>
    <div className='PocketNotesApp'>
      <NotesAppContext.Provider value={{allGroups, setAllGroups}}>
      <Pane setChangeViewNotes={setChangeViewNotes}/>
      <ViewNotes changeViewNotes={changeViewNotes}/>
      </NotesAppContext.Provider>
    </div> 
  </>
  )
}
