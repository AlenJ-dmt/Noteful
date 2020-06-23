import React from 'react'
import Folders from '../Folder/Folders'
import Notes from '../Notes/Notes'
import './Main.css'

class Main extends React.Component{
    render(){
       console.log(this.props.folderId)
        return(
            <div className='main' >
                <Folders folders={this.props.folders} />
                <Notes folderId={this.props.folderId} notes={this.props.notes} />
            </div>
        )
    }
}

export default Main;