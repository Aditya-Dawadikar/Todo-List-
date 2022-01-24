import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './Screens/Login'
import Todo from './Screens/Todo'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/todo' element={<Todo/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
