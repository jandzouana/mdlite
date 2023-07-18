import React from "react"

export default function Sidebar(props) {

    function getNoteSummary(note){
        // const json = JSON.stringify(note);
        if(note.includes("#")) {
            const split = note.split("#")[1].split("\n")[0];
            //console.log(split);
            return split;
        }
        else if(note.includes("\n")){
            return note.split('\n')[0];
        }
        else return note;
    }

    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div

                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{!note.body? `Note ${index + 1}` : getNoteSummary(note.body)}</h4>
                <button
                    className={note.id === props.currentNote.id ? "delete-btn selected-delete-btn" : "delete-btn"}
                    onClick={(event)=>props.deleteNote(note.id, event)}
                >
                    -
                </button>
            </div>
        </div>
    ))

    return (
        <div className={"sidebar--container"}>
            <section className="pane sidebar">
                <div className="sidebar--header">
                    <h3 id={"title"}>MD Lite</h3>
                    <button className="new-note" onClick={props.newNote}>+</button>
                </div>
                {noteElements}
            </section>
            <button className="clear-notes" onClick={props.clearNotes}>Clear</button>
        </div>

    )
}
