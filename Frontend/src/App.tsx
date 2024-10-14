import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                 <Route path="/main" element={<MainPage />} />
                <Route path="/shop" element={<div>Shop Page</div>} />
                <Route path="/blog" element={<div>Blog Page</div>} />
                <Route path="/about" element={<div>About Us Page</div>} />
              
            </Routes>
        </Router>
    );
}

export default App;
