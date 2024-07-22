import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import PrivateRoute from "./components/Authentication/PrivateRoute";

const App = () => {

    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={
                  <PrivateRoute>
                      <Home />
                  </PrivateRoute>
              }/>
        </Routes>
      </Router>
    );
  }
  
  export default App;