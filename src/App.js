import './App.css';
import Login from './components/pages/Login';
import Search from './components/pages/Search';
import TransactionHistory from './components/pages/TransactionHistory';
import Footer from './components/views/Footer';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Login />} key={document.location.href} />
                    <Route exact path="/search" element={<Search key={document.location.href} />} />
                    <Route exact path="/history/:id" element={<TransactionHistory key={document.location.href} />} />
                </Routes>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
