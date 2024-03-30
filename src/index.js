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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster /> 
    <ToastContainer />
  </Provider>
);