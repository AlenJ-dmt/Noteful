import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../NoteContext'

const LandingPage = () =>{

    const context = useContext(NoteContext)
    const history = useHistory()

    const [key, setKey] = useState('')

    const setTheUserKey = (ev) =>{
        ev.preventDefault()
        context.setUserKey(key)
        if(key === 'AlenDiaz'){
            history.push('/')
        }
    }



    return(
        <form>
            <input onChange={(ev) => setKey(ev.target.value)} />
            <button onClick={(ev) => setTheUserKey(ev)} >Login</button>
        </form>
    )
}

export default LandingPage;