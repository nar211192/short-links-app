import React, {useContext} from 'react'
import {NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const  Navbar = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const logOutHandler = event => {
    event.preventDefault()
    auth.logOut()
    history.push('/')
  }

  return (
    <nav className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
      <div className="nav-wrapper">
        <span className="brand-logo">link shortening</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><a href='/' onClick={logOutHandler}>Log Out</a></li>
        </ul>
      </div>
    </nav>    
  )
}