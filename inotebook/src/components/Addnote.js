import React, { useContext, useState } from 'react'
import notecontext from '../context/notes/NoteContext'
const Addnote = (props) => {
    const context = useContext(notecontext)
    const { addNote, mode } = context

    const [notes, setnote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();//taki page load na ho
        props.showAlert("Note Added", "dark")
        addNote(notes.title, notes.description, notes.tag)
        setnote({ title: "", description: "", tag: "" })
    }

    const onchange = (e) => {
        setnote({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <div className={`${mode === 'light' ? 'left_box' : 'left_box_dark'} mx-4 mt-3`}>
            <form className='form_design'>
                <div className="mb-3">
                    <label htmlFor="title" className={`${mode === 'light' ? 'textlight' : 'textdark'} form-label`} >Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={notes.title} aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className={`${mode === 'light' ? 'textlight' : 'textdark'} form-label`} >Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={notes.tag} onChange={onchange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`${mode === 'light' ? 'textlight' : 'textdark'} form-label`} >Description</label>
                    <textarea rows="5" type="text" className="form-control" id="description" name="description" value={notes.description} onChange={onchange} minLength={5} required />
                </div>

                <div className='btn_center'>

                    <button
                        disabled={notes.title.length < 3 || notes.description.length < 5 || notes.tag.length < 2}
                        type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default Addnote
