import React, { useContext } from 'react'
import Addnote from './Addnote'
import Notes from './Notes'
import usercontext from '../context/notes/NoteContext'
const Home = (props) => {
    const context = useContext(usercontext)
    const { mode } = context
    document.body.style.backgroundColor = mode === 'light' ? 'white' : '#060506cf'
    return (

        <>

            <div className='flexible my-3' >
                <Addnote showAlert={props.showAlert} />
                <Notes showAlert={props.showAlert} />
            </div >

        </>
    )
}

export default Home
