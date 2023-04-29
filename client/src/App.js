import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import SavedPost from './pages/SavedPost';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/createPost" element={<CreatePost/>}/>
          <Route path="/savedPost" element={<SavedPost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
