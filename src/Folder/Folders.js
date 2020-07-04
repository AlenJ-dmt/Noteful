import React from 'react'
import Folder from '../components/Folder'
import './Folders.css'
import NoteContext from '../NoteContext'


class Folders extends React.Component{
    
    static contextType = NoteContext
    render(){
        const folders = this.context.folders.map((folder, idx) => 
            <Folder key={idx} name={folder.name} id={folder.id}/>
            )
        return(
            <div className='folders'>
                {folders}
                <button className='add-folder'>Add folder</button>
            </div>
        )
    }
}

export default Folders;