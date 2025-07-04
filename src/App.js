import logo from './logo.svg';
import './App.css';
import Inbox from './Inbox';
import Homepage from './Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Compose from './Compose';
import Signup from './Signup';
import Signin from './Signin';
function App() {
  return (
   <div>
   <Router>
    <Routes>
    <Route path="/Homepage" element={<Homepage />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/compose" element={<Compose/>}/>
      <Route path='/' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes>
   </Router>
   </div>
  );
}

export default App;
