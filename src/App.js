import React, {useState, useEffect} from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import "./style.css"

export default function App() {
    const [notes, setNotes] = useState(() => getSavedNotes() || [])
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )

    useEffect(()=>{
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes])

    function getSavedNotes(){
        const notes = localStorage.getItem("notes");
        if(notes){
            return JSON.parse(notes);
        }
        return null;
    }

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function clearNotes(){
        setNotes([]);
    }

    function deleteNote(id, event){
        console.log("delete: " + id);
        event.stopPropagation();

        setNotes(notes => {
            const oldNoteIdx = notes.findIndex(note => note.id === id);
            let newNotes = [...notes];
            newNotes.splice(oldNoteIdx, 1);
            return newNotes;
        })
    }

    function updateNote(text) {
        // This does not rearrange the notes
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId
        //         ? { ...oldNote, body: text }
        //         : oldNote
        // }))
        setNotes(notes => {
            // find note
            const oldNoteIdx = notes.findIndex(note => note.id === currentNoteId);
            let oldNote = notes.splice(oldNoteIdx, 1)[0];
            oldNote.body = text;
            return [oldNote, ...notes];
        })
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        minSize={[200, 0]}
                        maxSize={[350, Infinity]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={findCurrentNote()}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            clearNotes={clearNotes}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={findCurrentNote()}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}
