import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


class Header extends React.Component{
    render(){
       return  <Link className='header' to='/'> Notefull </Link>
    }
}

export default Header;