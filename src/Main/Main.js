import React from 'react'
import Folders from '../Folders/Folders'
import Notes from '../Notes/Notes'
import './Main.css'
import PropTypes from 'prop-types';

class Main extends React.Component{
    render(){
        return(
            <div className='main' >
                <Folders />
                <Notes {...this.props} />
            </div>
        )
    }
}

Main.propTypes = {
    folderId: PropTypes.string
}

export default Main;