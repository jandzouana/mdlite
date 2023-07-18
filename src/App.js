import React, {useState, useEffect} from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import "./style.css"
import favicon from './favicon.ico';

export default function App() {
    const [notes, setNotes] = useState(() => getSavedNotes() || [])
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )

    const [splitSizes, setSplitSizes] = useState(getSplitSizes());

    // console.log("sizes: " + sizes);
    // console.log("sizes 2" + localStorage.getItem('split-sizes'));

    useEffect(()=>{
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes])

    useEffect(()=>{
        document.getElementById("favicon").href = favicon;
    }, [])

    function getSplitSizes(){
        console.log("Getting sizes...");

        let localSizes = localStorage.getItem('split-sizes');
        if (localSizes) {
            console.log("Got sizes: " + localSizes);
            return(JSON.parse(localSizes));
        }
        else {
            return [30, 70] // default sizes
        }
    }

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
        const result = window.confirm("Are you sure you want to delete ALL notes?");

        if (result) {
            setNotes([]);
        }
    }

    function deleteNote(id, event){
        console.log("delete: " + id);
        event.stopPropagation();

        const result = window.confirm("Delete this note?");

        if (result) {
            // User clicked "Yes"
            // Perform actions for "Yes" response
            console.log("User clicked 'Yes'");
            setNotes(notes => {
                const oldNoteIdx = notes.findIndex(note => note.id === id);
                let newNotes = [...notes];
                newNotes.splice(oldNoteIdx, 1);
                return newNotes;
            })
        } else {
            // User clicked "No" or closed the dialog
            // Perform actions for "No" or cancelled response
            console.log("User clicked 'No' or cancelled");
        }
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
                        sizes={splitSizes}
                        onDragEnd={sizes => {
                            //console.log("Updating sizes: " + sizes);
                            localStorage.setItem('split-sizes', JSON.stringify(sizes));
                            setSplitSizes(sizes);
                        }}
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
