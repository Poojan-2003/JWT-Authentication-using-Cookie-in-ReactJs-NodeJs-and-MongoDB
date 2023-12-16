import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter , Routes , Route} from "react-router-dom"


function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
      <Route exact path='/' element = {<Login />}></Route>
      <Route exact path='/Signup' element = {<Signup />}></Route>
      <Route exact path='/Home' element = {<Home />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
