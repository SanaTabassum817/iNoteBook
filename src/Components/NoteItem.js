import React,{useContext} from 'react' //rafce
import noteContext from "../Context/Notes/NoteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const {deleteNote,editNote } = context;   //destructuring
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                         props.showAlert("Deleted Sucessfully","success");}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note); }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>

        </div>
    )
}

export default NoteItem
