import React, {useState, useEffect, useRef} from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import "./style.css"
import favicon from './assets/favicon.ico';
import { onSnapshot, addDoc, deleteDoc, setDoc, getDocs, doc } from 'firebase/firestore';
import {notesCollection, db, onAuthStateChange, auth} from './firebase';
import Loader from './components/Loader';
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import AuthManager from "./components/AuthManager";

export default function App() {
    //console.log("Top");
    const [signedIn, setSignIn] = useState(false);
    const [creatingNote, setCreatingNote] = useState(false);
    const [notes, setNotes] = useState([]);
    const [tempNoteText, setTempNoteText] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(""
    );
    const [splitSizes, setSplitSizes] = useState(getSplitSizes());
    const [loading, setLoading] = useState(true);
    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0];

    let currentTimer = useRef(null);
    let prevId = useRef(currentNoteId);

    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

    // Set temp note text when current note changes to display in editor
    useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body);
            //console.log("Current note: ", currentNote);
        }
    }, [currentNote])

    // See what the current note is every time the user clicks a note
    useEffect(() => {
        if (currentNote) {
            console.log("Current note: ", currentNote);
        }
    }, [currentNoteId])

    // Initialize current note id
    useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    // Updates current note text upon changes with a .5 second delay
    useEffect(() => {
        if(loading) return;
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote?.body) {
                updateCurrentNote().then(id => console.log("Updated note with id: " + id));
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])

    //console.log("Temp: " + tempNoteText);

    // Update db in cloud when we make changes to notes
    useEffect(() => {
        if(!signedIn) return;
        setLoading(true);
        return onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr);
            setLoading(false);
            //console.log("Update ", notesArr);
        })
    }, [signedIn])

    // Set favicon
    useEffect(()=>{
        document.getElementById("favicon").href = favicon;
    }, [])


    function getSplitSizes(){
        //console.log("Getting sizes...");

        let localSizes = localStorage.getItem('split-sizes');
        if (localSizes) {
            //console.log("Got sizes: " + localSizes);
            return(JSON.parse(localSizes));
        }
        else {
            return [30, 70] // default sizes
        }
    }

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        setCreatingNote(true);
        const newNoteRef = await addDoc(notesCollection, newNote);
        // console.log("Wait for 2 seconds...");
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // console.log("Done creating note " + newNoteRef.id);
        setCurrentNoteId(newNoteRef.id);
        setCreatingNote(false);
    }

    async function clearNotes() {
        const result = window.confirm("Are you sure you want to delete ALL notes?");

        if (result) {
            const querySnapshot = await getDocs(notesCollection);

            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
                    .then(() => {
                        console.log(`Document with ID ${doc.id} successfully deleted.`);
                    })
                    .catch((error) => {
                        console.error(`Error deleting document with ID ${doc.id}:`, error);
                    });
            });
        }
    }

    async function deleteNote(id, event){
        console.log("delete: " + id);
        event.stopPropagation();

        const result = window.confirm("Delete this note?");

        if (result) {
            // User clicked "Yes"
            // Perform actions for "Yes" response
            console.log("User clicked 'Yes'");
            const docRef = doc(db, "notes", id);
            await deleteDoc(docRef);
        } else {
            // User clicked "No" or closed the dialog
            // Perform actions for "No" or cancelled response
            console.log("User clicked 'No' or cancelled");
        }
    }

    function updateNoteText(text) {
        setTempNoteText(text);
    }

    function changeCurrentNote(id){
        // Trigger save of temp text if it has changed
        // updateCurrentNote().then(id => console.log("Updated note with id: " + id));
        setCurrentNoteId(id);
    }

    function handleUserSignIn(user){
        setSignIn(true);
    }

    function handleSignOut(){
        setSignIn(false);
    }

    function handleFetchUser(){
        console.log("Fetched user");
        setLoading(false);
    }

    async function updateCurrentNote() {
        console.log("Updating note with id: " + currentNoteId);
        const docRef = doc(db, "notes", currentNoteId);
        await setDoc(docRef, { body :  tempNoteText, updatedAt: Date.now()}, { merge: true });
        return currentNoteId;
    }

    return (
        <main>
            <Loader show={loading}/>
            <AuthManager handleUserSignIn={handleUserSignIn} handleSignOut={handleSignOut} handleFetchUser={handleFetchUser}/>
            {!signedIn && <SignIn />}
            <SignOut/>

            {signedIn &&
                (
                    notes.length > 0
                        ?
                        <Split
                            sizes={splitSizes}
                            onDragEnd={sizes => {
                                // const temp = [...sizes];
                                // temp[0] = temp[0].toFixed(10);
                                // temp[1] = Math.floor(temp[1]);

                                if (sizes[0] !== splitSizes[0] || sizes[1] !== splitSizes[1]) {
                                    console.log("Updating sizes: " + sizes);
                                    localStorage.setItem('split-sizes', JSON.stringify(sizes));

                                    setSplitSizes(sizes);

                                    // localStorage.setItem('split-sizes', JSON.stringify([30, 70]));
                                    //
                                    // setSplitSizes([30, 70]);
                                }
                            }}
                            minSize={[200, 0]}
                            maxSize={[350, Infinity]}
                            direction="horizontal"
                            className="split"
                        >
                            <Sidebar
                                notes={sortedNotes}
                                currentNote={currentNote}
                                setCurrentNoteId={changeCurrentNote}
                                newNote={createNewNote}
                                deleteNote={deleteNote}
                                clearNotes={clearNotes}
                                addButtonEnabled={!creatingNote}
                            />
                            <Editor
                                currentNoteText={tempNoteText}
                                updateNoteText={updateNoteText}
                            />
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
                    )
            }
        </main>
    )
}
