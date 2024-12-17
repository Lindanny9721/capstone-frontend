import LoginPage from './pages/SignUpPage';
import MapComponent from './components/MapComponent';
import SignUpPage from './pages/SignUpPage'
import { Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<Homepage/>}/> */}
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      <Login/>
    </div>
  );
};

export default App;