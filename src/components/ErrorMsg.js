import React from 'react'

class ErrorMsg extends React.Component{
    render(){
        return(
            <>
            {<p> {this.props.children} </p>}
            </>
        )
    }
}
export default ErrorMsg;