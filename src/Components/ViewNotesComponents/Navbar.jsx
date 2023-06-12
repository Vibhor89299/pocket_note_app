import React, {useContext, useEffect, useState} from 'react'
import DeleteIcon from './DeleteIcon.png'
import { NotesAppContext } from '../NotesAppContext'
import Modal from 'react-modal'
import "./Navbar.css"


export default function Navbar(props) {
    const [isModalOpen, setIsModalOpen] =useState(false)
    const {allGroups, setAllGroups} = useContext(NotesAppContext)
    const [shortName, setShortName] = useState("")
    const [buttonColor, setButtonColor] = useState("white")
    useEffect(()=>{
        setShortName(props.name.substring(0,2).toUpperCase())
        setButtonColor(allGroups[props.name].chosenColor)
    }, [props.name])
    const [Groups, setGroups] = useState(JSON.parse(localStorage.getItem("Groups")))
    useEffect(()=>{
        localStorage.setItem("Groups", JSON.stringify(Groups))
        setAllGroups(Groups)
    }, [Groups])

    const nav = {
        width: "100%",
        background: "#E8E8E8",
        height: "9%",
        display: "flex",
        alignItems: "center",
    }

    const buttonStyle = {
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "100%",
        background: buttonColor,
        border: "none",
        position: "relative",
        left: "2rem", 
        fontFamily: '"Roboto"',
        fontSize: "1.4rem",
        color: "#fff"         
    }

    const headingStyle = {
        position: "relative",
        left: "3.5rem",
        fontFamily: "Roboto",
    }

    const deleteStyle = {
        width: "2.5rem",
        position: "absolute",
        left: "92%", 
        cursor: "pointer"
    }

    

    const toggleModalDenyDelete = () => {
        setIsModalOpen(false)
    }

    const toggleModalConfirmDelete = ()=>{
        setIsModalOpen(!isModalOpen)
        deleteGroup();
        window.location.reload();
    }

    const deleteGroup = ()=>{
        const newObj = {...Groups}
            delete newObj[props.name]
            setGroups(newObj)
        localStorage.removeItem(`${props.name}`)
        localStorage.removeItem(`${props.name}-time`)    
    }

    const modalButtonStyle = {
        border: "none",
        background: "#E8E8E8",
        padding: "0.5rem 1rem",
        borderRadius: "18px",
        cursor: "pointer",
    }

  return (
    <div style={nav}>
        <button style={buttonStyle}>{shortName}</button>
        <h3 style={headingStyle}>{props.name}</h3>
        <img style={deleteStyle} src={DeleteIcon} alt="Delete" onClick={()=>{
            setIsModalOpen(true)
            
        }}/>
    <Modal isOpen={isModalOpen} onRequestClose={toggleModalDenyDelete} className="deleteModal">
        <div>Are you sure you want to delete your note? This can't be reversed and will cause a page reload.</div>
        <br />
        <button onClick={toggleModalDenyDelete} style={modalButtonStyle}>Deny</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={toggleModalConfirmDelete} style={modalButtonStyle}>Confirm</button>
    </Modal>
    </div>
  )
}
