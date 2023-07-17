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
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
                <button className="clear-notes" onClick={props.clearNotes}>Clear</button>
            </div>
            {noteElements}
        </section>
    )
}
