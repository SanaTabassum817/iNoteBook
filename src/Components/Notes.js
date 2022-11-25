import React, { useContext, useRef } from 'react'   // rafc
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from "../Context/Notes/NoteContext";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { notes, getNotes, addNote ,editNote} = context;   //destructuring
   let navigate=useNavigate();
    useEffect(() => {
        
        if(localStorage.getItem('token'))
        {
            getNotes();  }
        else
        {
            navigate('/login');   
        } 
     // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
   
    }
    const handleClick = (e) => {
        // addNote(note.title, note.description, note.tag);
     //  ref.current.click();
     editNote(note.id,note.etitle,note.edescription,note.etag);
     refClose.current.click();
     props.showAlert("Updated Sucessfully","success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <h2>Your Notes</h2>
                    {notes.map((note) => {
                        return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />  // use _ with id
                    })}
                </div>
            </div>
        </>
    )
}
