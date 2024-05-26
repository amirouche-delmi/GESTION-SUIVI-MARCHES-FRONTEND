import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from './contexts/AppContext';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import LoadingPage from './pages/Loading/LoadingPage';
import { getUser } from "./actions/userActions";
import DMDashboard from './DMDashboard';
import AdminDashboard from './AdminDashboard';
import CEODashboard from './CEODashboard';

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/jwtid`,
          withCredentials: true,
        });
        setUid(res.data);
        if (uid) {
          await dispatch(getUser(uid));
        }
      } catch (err) {
        console.log("No token");
      }
    };
    fetchToken();
  }, [uid, dispatch]);
  

  return (
    <UidContext.Provider value={uid} >      
      {uid == null ? (
        <Router>
          <Routes>
            <Route path="/" element={<LoadingPage />} />
          </Routes>
        </Router>
      ) : ( uid == false ? (
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      ) : (userData.role === 'Admin' ? (            
        <AdminDashboard />              
      ) : (userData.role === 'DM' ? (
        <DMDashboard />      
      ) : (
        <CEODashboard />
      ))))}       
    </UidContext.Provider>    
  );
}

export default App;
