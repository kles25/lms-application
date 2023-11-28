import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import About from './pages/about/About';
import News from './pages/news/News';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="news" element={<News />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;
