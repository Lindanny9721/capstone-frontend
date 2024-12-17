import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapComponent from './components/MapComponent';
import SignUpPage from './pages/SignUpPage'
const App = () => {
  return (
    <div className="App">
      <MapComponent/>
      {/* <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes> */}
    </div>
  );
};

export default App;