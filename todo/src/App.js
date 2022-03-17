import './App.css';
import HomePage from './HomePage';
import Add from './Add';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import List from './List';
import Edit from './Edit';

function App() {
  return (
    
    <Router>
        <div className="App">
          
          <Routes>
          <Route path="*" element={<Navigate to ="/default-route" />}/>
          <Route path="/default-route" exactMatch element={<HomePage/>}/>
          <Route path="/add" exactMatch element={<Add/>} />
          <Route path="/list" exactMatch element={<List/>} />
          <Route path="/edit" exactMatch element={<Edit/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
