import './App.css';
import Login from './components/pages/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
