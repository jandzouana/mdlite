import React from 'react'

const Export = (props) =>{
    const {text} = props;

    function saveStringToFile(stringData, fileName) {
        const blob = new Blob([stringData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    }

    function handleClick(){
        saveStringToFile(text, "md.txt");
    }

    return(
        <button onClick={handleClick} id={"export"} className={"button grey-button"}>
            Export
        </button>
    )
}

export default Export;
