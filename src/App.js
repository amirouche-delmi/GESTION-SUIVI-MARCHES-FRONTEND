import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound.js';
import { UidContext } from './components/AppContext';
import axios from "axios";
import LoadingPage from './pages/LoadingPage';
// import { useDispatch } from "react-redux";
// import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState(null);
  // const dispatch = useDispatch();

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

    // if (uid) dispatch(getUser(uid));
  // }, [uid, dispatch]);
  }, [uid]);

  return (
    <UidContext.Provider value={uid} >
      <Router>
        <Routes>
          {uid == null ? (
            <Route path="/" element={<LoadingPage />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </UidContext.Provider>
    
  );
}

export default App;
