import React, { useContext } from 'react'
import notecontext from '../context/notes/NoteContext'



const Noteitem = (props) => {
    const context = useContext(notecontext)
    const { deleteNote, mode } = context

    const { note, updateNote } = props;

    const handledelete = () => {
        props.showAlert("Noted deleted successfully", "primary")
        deleteNote(note._id)
    }
    return (
        <>
            <div className={`${mode === 'light' ? 'card' : 'card_dark'} my-2 mx-2`} style={{ width: '30%' }}>
                <div className="py-3 px-3">
                    <h5 className={`${mode === 'light' ? 'card-title' : 'card-title-dark'}`}>{note.title.toUpperCase()}</h5>

                    {note.description.length > 48 ? <p className={`${mode === 'light' ? 'card-text' : 'card-text-dark my-2'}`} style={{ color: `${mode === 'light' ? 'black' : 'white'}` }}>{note.description.substr(0, 45)}...</p> : <p className={`${mode === 'light' ? 'card-text' : 'card-text-dark'}`} style={{ color: `${mode === 'light' ? 'black' : 'white'}` }}>{note.description}</p>}
                    <h6 className="card-subtitle mb-2 text-muted" style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} >{note.tag}</h6>
                    <div className='d-flex justify-content-between'>
                        <span className="material-icons-outlined" style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} onClick={handledelete}>
                            &#xe92e;
                        </span>
                        <span className="material-symbols-outlined" style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} onClick={() => { updateNote(note) }}>
                            &#xe3c9;
                        </span>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Noteitem
