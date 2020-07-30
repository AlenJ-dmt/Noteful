import React from 'react';
import './ValidationError.css';

export default function ValidationError(props) {
  if (props.message.length > 1) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}