import './App.css';
import Read from './component/main';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Read/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
