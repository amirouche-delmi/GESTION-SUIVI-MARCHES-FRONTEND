import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from './contexts/AppContext';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Loading from './pages/Loading/Loading';
import { getUser } from "./actions/userActions";
import AdminDashboard from './AdminDashboard';
import DMDashboard from './DMDaxhboard';
import CCMDashboard from './CCMDashboard';

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid} >      
      {uid == null ? (
        <Router>
          <Routes>
            <Route path="/" element={<Loading />} />
          </Routes>
        </Router>
      ) : ( uid == false ? (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      ) : (userData.role === 'Admin' ? (            
        <AdminDashboard />              
      ) : userData.role === 'DM' ? (
        <DMDashboard />
      ) : (
        <CCMDashboard />
      )))}       
    </UidContext.Provider>    
  );
}

export default App;
