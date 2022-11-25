import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  // const s1 = {
  //     "name": "Sana",
  //     "class": "11"
  // }
  // const [state, setState] = useState(s1);
  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "Tabassum",
  //             "class": "111"
  //         })
  //     }, 1000);
  // }
  const notesInital = []
  const [notes, setNotes] = useState(notesInital);
  //Get all Notes
  const getNotes = async () => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });


    // Client side
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }


  // Add a Note
  const addNote = async (title, description, tag = "") => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json=response.json();
    console.log(json);

    // Client side
    console.log('adding a new note')
    let note = {
      "_id": "62c92b1a9a3cbc317ad84b33",
      "user": "62c7d052b22813c33b7c2f40",
      "title": title,
      "description": description,
      "tag": "personal",
      "date": "2022-07-09T07:15:38.450Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {

    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
     const json = response.json();
     console.log(json);
    console.log("Deleteing a note" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
     const json = response.json();
    console.log(json);
    // Client side
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }
  return (
    // <NoteContext.Provider value={{ state, update }}>
    <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;