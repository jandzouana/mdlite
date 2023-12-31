import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"
import Export from "./Export.js";

export default function Editor({ currentNoteText, updateNoteText }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    return (
        <section className="pane editor">
            <ReactMde
                value={currentNoteText}
                onChange={updateNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                maxEditorHeight={80}
                minEditor
                heightUnits="vh"
            />
            <Export text={currentNoteText}/>
        </section>
    )
}
