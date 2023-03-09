import './App.css'

import Navbar from './components/Navbar/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


import Home from './screens/Home';
import HistoryTab from './screens/HistoryTab';
import { useState, useEffect } from "react";
import {HashLoader} from 'react-spinners';



function App() {

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <div className="App">
    <div id="loader-style">
      <HashLoader color="#df1a37" loading />
      <h2 style={{ color: "#df1a37", marginTop: "8px" }}>Loading</h2>
    </div>
  </div>
) : (
  <div className="App">
      <Router history={history}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/history' element={<HistoryTab/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App