import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home"
import Logs from "./pages/EndNodesLogs"
import AddNode from "./components/AddNode";
import Navbar from "./components/Navbar";
import Applications from "./pages/Applications";
import EndNodes from "./pages/EndNodes";
import Gateways from "./pages/Gateways";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationAdd from "./pages/ApplicationAdd";
import EndNodesLogs from "./pages/EndNodesLogs";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="add-node" element={<ProtectedRoute><AddNode /></ProtectedRoute>} />
          <Route path="applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} ></Route>
          <Route path="applications/add" element={<ProtectedRoute><ApplicationAdd /></ProtectedRoute>} ></Route>
          <Route path="endnodes/:id" element={<ProtectedRoute><EndNodesLogs /></ProtectedRoute>} />
          <Route path="endnodes" element={<ProtectedRoute><EndNodes /></ProtectedRoute>} />
          <Route path="gateways" element={<ProtectedRoute><Gateways /></ProtectedRoute>} >
            <Route path=":id" element={<Logs />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </AuthProvider>
  );
};
export default App;