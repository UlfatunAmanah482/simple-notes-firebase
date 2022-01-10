import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {Provider} from 'react-redux'

import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import { store } from '../../../config/redux/store'
import NewDashboard from "../Dashboard/NewDashboard";
import Detail from "../Detail";
import CreateNote from "../CreateNote";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-dashboard" element={<NewDashboard />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/create-note" element={<CreateNote />} />
        </Routes>
      </Router>
    </Provider>
  );
}