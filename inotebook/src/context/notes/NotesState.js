import { React, useState } from 'react'

import Notecontext from './NoteContext'
//state banni hai jo sbko acessible ho

// const NoteState = (props) => {
//     const state1 = {
//         //ise use krna hai toh usecontext
//     }
//     const [State, setState] = useState(state1);
//     const update = () => {  //ise use krna hai toh use effect
//         setTimeout(() => {
//             setState({

//             })
//         }, 1000)
//     }
//     return (
//         <Notecontext.Provider value={{ state, update }}> {/*value jo bhi provide krni ho
//<Notecontext.Provider value={{state: state,update: update }}> 
//         jhn bhi ye notecontext use krenge sare ke sare children uske andr ajynge chize uske andr wrap hojyegi*/}
//             {props.child}
//         </Notecontext.Provider >
//     )
// }

const NoteState = (props) => {

    const noteInital = []
    const [notes, setNotes] = useState(noteInital)
    const [alertshow, setalertshow] = useState("")
    const [mode, setmode] = useState("light")


    //get all notes



    const getNote = async () => {

        //api call
        // const url = `http://localhost:5000/api/note/fecthnotes`
        const url = `api/note/fecthnotes`
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },


        });
        const json = await response.json()

        setNotes(json)
    }


    //add note
    const addNote = async (title, description, tag) => {

        //api call
        // const url = `http://localhost:5000/api/note/addnotes`
        const url = `api/note/addnotes`
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        const json = await response.json();

        const note = json
        setNotes(notes.concat(note));
    }

    //delete note
    const deleteNote = async (id) => {

        //api call
        // const url = `http://localhost:5000/api/note/deletenote/${id}`
        const url = `api/note/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token")

            },


        });
        const json = response.json(); // parses JSON response into native JavaScript objects

        const newnotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newnotes)
    }

    //edit note
    const editNote = async (id, title, description, tag) => {

        //api call
        // const url = `http://localhost:5000/api/note/updatenotes/${id}`
        const url = `api/note/updatenotes/${id}`
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects

        let newnotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title
                newnotes[index].description = description
                newnotes[index].tag = tag
                break;
            }
        }
        setNotes(newnotes)
    }

    const updateUser = async (id, name, email, avatar) => {

        //api call
        // const url = `http://localhost:5000/api/auth/updateuser/${id}`
        const url = `api/auth/updateuser/${id}`
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token")

            },

            body: JSON.stringify({ name, email, avatar })
        });
        const json = await response.json();
        if (json.success) {

            setalertshow("success")

            localStorage.setItem("UserDeatils", JSON.stringify(json.user))



        }
        else {
            setalertshow("danger")

        }


    }



    return (
        <Notecontext.Provider value={{ notes, getNote, addNote, deleteNote, editNote, updateUser, alertshow, mode, setmode }}>
            {props.children}
        </Notecontext.Provider >
    )
}

export default NoteState