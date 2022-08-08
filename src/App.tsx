import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Applications from "./pages/Applications";
import EndNodes from "./pages/EndNodes";
import Gateways from "./pages/Gateways";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import EndNodesLogs from "./pages/EndNodesLogs";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import ApplicationCreate from "./pages/ApplicationCreate";
import EndNodeCreate from "./pages/EndNodeCreate";
import GatewayCreate from "./pages/GatewayCreate";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Container className="main-container">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} ></Route>
          <Route path="applications/add" element={<ProtectedRoute><ApplicationCreate /></ProtectedRoute>} ></Route>
          <Route path="endnodes/add" element={<ProtectedRoute><EndNodeCreate /></ProtectedRoute>} />
          <Route path="endnodes/:id" element={<ProtectedRoute><EndNodesLogs /></ProtectedRoute>} />
          <Route path="endnodes" element={<ProtectedRoute><EndNodes /></ProtectedRoute>} />
          <Route path="gateways/add" element={<ProtectedRoute><GatewayCreate /></ProtectedRoute>} />
          <Route path="gateways" element={<ProtectedRoute><Gateways /></ProtectedRoute>} />
          <Route path="/*" element={<Navigate to="/applications"></Navigate>} />
        </Routes>
      </Container>
      <Footer />
    </AuthProvider>
  );
};
export default App;