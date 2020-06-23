import React from "react";
import { Link } from 'react-router-dom'
import './AnimalCard.css'

class AnimalCard extends React.Component {
  render() {
    return (
      <div className='detail'>
        <section className='sidebar'>
            <Link to='/'>Go Back:</Link>
            <h2>Current Folder: {this.props.currentFolder[0].name}</h2>
        </section>
        <section className='main'>
          <h1>{this.props.selectedNote[0].name}</h1>
          <h2>{this.props.selectedNote[0].modified}</h2>
          <p>{this.props.selectedNote[0].content}</p>
        </section>
      </div>
    );
  }
}
export default AnimalCard;
