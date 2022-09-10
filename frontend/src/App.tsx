import React from 'react';
// import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import SignIn from './components/pages/SignIn'
import { Route, Routes } from 'react-router'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Button } from '@mui/material';
import { Contacts } from '@mui/icons-material';


// const styles = () => ({
//   root: {
//     color: 'red'
//   }
// });


function App() {
  return (
    <div>
      <Router>
        <nav>
          {/* <Link to="/" style={{ textDecoration: 'none' }}><Button>Home</Button></Link> */}
          <Link to="/signin" style={{ textDecoration: 'none' }}><Button>signin</Button></Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}><Button>signup</Button></Link>
          <Link to="/contacts" style={{ textDecoration: 'none' }}><Button>constacts</Button></Link>
        </nav>
        <Routes>
          {/* <Route path='/' element={<Home />}></Route> */}
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;
