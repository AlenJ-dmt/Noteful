import React from 'react'
import Folder from '../components/Folder'
import './Folders.css'

class Folders extends React.Component{

    folders = this.props.folders.map(folder => 
        <Folder name={folder.name} id={folder.id}/>
        )
    render(){
        return(
            <div className='folders'>
                {this.folders}
                <button className='add-folder'>Add folder</button>
            </div>
        )
    }
}

export default Folders;