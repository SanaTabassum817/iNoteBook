import React from 'react'
import noteContext from "../Context/Notes/NoteContext";
import { useState ,useContext} from 'react';
const AddNote = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const {addNote } = context;   //destructuring
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>
    {
        e.preventDefault();
         addNote(note.title,note.description,note.tag);
         props.showAlert("Note Added Sucessfully","success");
    }
    const onChange=(e)=>{
  setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add Your Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description"  name='description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag"  name='tag' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote