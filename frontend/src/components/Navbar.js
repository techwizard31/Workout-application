import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  const { logout }=useLogout()
  const { user }=useAuthContext()

  const handleclick = () =>{
        logout()
  }
  return (
   <header>
    <div className="container">
       <Link to='/'>
        <h2>Workout Buddy</h2>
       </Link>
       <nav>
       {user && (<div>
          <span>{user.email}</span>
          <button onClick={handleclick}>Log out</button>
        </div>)}
       {!user && (<div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>)}      
       </nav>
    </div>
   </header>
  )
}

export default Navbar;