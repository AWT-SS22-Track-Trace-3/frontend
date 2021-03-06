import './App.css';
import Login from './components/pages/Login';
import Search from './components/pages/Search';
import TransactionHistory from './components/pages/TransactionHistory';
import Footer from './components/views/Footer';
import RedirectHandler from './components/pages/RedirectHandler';
import CustomNavbar from './components/views/CustomNavbar';
import Incidents from './components/pages/Incidents';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <CustomNavbar></CustomNavbar>
                <Routes>
                    <Route exact path="/" element={<RedirectHandler />} key={document.location.href} />
                    <Route exact path="/register" element={<Login mode="register" />} key={document.location.href} />
                    <Route exact path="/login" element={<Login mode="login" />} key={document.location.href} />
                    <Route exact path="/search" element={<Search key={document.location.href} />} />
                    <Route exact path="/incidents" element={<Incidents key={document.location.href} />} />
                    <Route exact path="/history/:id" element={<TransactionHistory key={document.location.href} />} />
                </Routes>
                {
                    //<Footer></Footer>
                }
            </div>
        </Router>
    );
}

export default App;
