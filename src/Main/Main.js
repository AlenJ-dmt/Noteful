import React from 'react'
import Folders from '../Folder/Folders'
import Notes from '../Notes/Notes'
import './Main.css'


class Main extends React.Component{
    render(){
        return(
            <div className='main' >
                <Folders />
                <Notes {...this.props} folderId={this.props.folderId} />
            </div>
        )
    }
}

export default Main;