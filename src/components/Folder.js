import React from "react";
import { Link } from "react-router-dom";
import './Folder.css'
import PropTypes from "prop-types";

class Folder extends React.Component {

  navigate = (id) =>{
    this.props.history.push(`/folder/${id}`)
  } 
  render() {
    return (
      <div className='folder'>
        <Link to={`/folder/${this.props.id}`} >{this.props.name}</Link>
        
      </div>
    );
  }
}

Folder.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Folder;
