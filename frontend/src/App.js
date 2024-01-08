import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';
import Home from './pages/home.js';
import Navbar from './components/Navbar.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';


function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar />
       <Routes>
        <Route 
         path="/"
         element={user ?<Home />:<Navigate to="/login"/>}
        />
        <Route 
         path="/login"
         element={!user ?<Login />:<Navigate to="/"/>}
        />
        <Route 
         path="/signup"
         element={!user ? <Signup />:<Navigate to="/"/>}
        />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
