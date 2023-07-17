import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css'
import Tenant from './Pages/Tenant/Tenant';
import {Provider, useSelector} from 'react-redux';
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup';
import Protected from './components/Protected/Protected'
import Owner from './Pages/Owner/Owner';
import AdminReqs from './Pages/AdminReqs/AdminReqs';
import useAutoLogin from './hooks/useAutoLogin'
import SingleProperty from './Pages/SingleProperty/SingleProperty';
import Chat from './Pages/Chat/Chat';

function App() {
  const isAuth = useSelector ((state) => state.user.auth);
  const isAdmin = useSelector ((state) => state.user.isAdmin);
  const loading = useAutoLogin();
  
  return loading ? (<div>hi</div>):(
    <div className={styles.container}>
      <BrowserRouter>
      <div className={styles.container}>
        <Navbar/>
        <Routes>
          <Route 
          path="/"
          exact
          element={
            <div>Hey hiiiiii</div>
          }/>
          <Route
          path="home"
          element={
            <Home/>
          }/>
          <Route
          path="tenant"
          element={
            <Protected isAuth={isAuth}>
              <Tenant/>
            </Protected>
          }/>
          <Route
          path="login"
          element={
           <Login/>
          }/>
          <Route
          path="signup"
          element={
           <Signup/>
          }/>
          <Route
          path="owner"
          element={
            <Protected isAuth = {isAuth}>
              <Owner/>
            </Protected>
          }/>
          <Route
          path="propertyReqs"
          element={
            <Protected isAuth = {isAuth}>
              <AdminReqs/>
            </Protected>
          }/>
          <Route
          path="property/:id"
          element={
            <Protected isAuth = {isAuth}>
              <SingleProperty/>
            </Protected>
          }/>
          <Route
          path="chat/:id"
          element={
            <Protected isAuth = {isAuth}>
                <Chat/>
            </Protected>
          }/>
        
        </Routes>
      </div>
    
    </BrowserRouter>
      </div>
  
  );
}

export default App;
