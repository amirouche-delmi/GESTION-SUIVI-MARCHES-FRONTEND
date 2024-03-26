import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

// import { getUsers } from "./actions/users.actions";
// import { BrowserRouter } from "react-router-dom";
// import { getPosts } from "./actions/post.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.dispatch(getUsers());
// store.dispatch(getPosts());

// ReactDOM.render(
//   // <React.StrictMode>
//   //   <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>,
//   //   </BrowserRouter>
//   // </React.StrictMode>,
//   document.getElementById('root')
// );
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster /> 
    <ToastContainer />
  </Provider>
);