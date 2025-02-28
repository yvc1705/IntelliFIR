import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage.jsx';
import FIRRegistration from './components/RegisterFIR/RegisterFIR.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import { useSelector, useDispatch } from 'react-redux';
import OfficerLoginPage from './pages/OfficerLoginPage/OfficerLoginPage';
import FIRList from './pages/FetchFIRs';
import FAQs from './components/FAQS/FAQS';
import IPCDetails from './components/IPCs/IPCDetails';
import { ToastContainer, toast } from 'react-toastify';
import { hideToast } from './redux/slices/storeJwt/toastSlice'; // Import hideToast action
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import MyFirs from './components/MyFirs/MyFirs';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);  // Ensure you're accessing the correct part of state
  const isAuth = Boolean(token && token !== '');

  // Access toast state
  const { message, type, isVisible } = useSelector((state) => state.toast);

  // Show toast notification when it is visible
  useEffect(() => {
    if (isVisible) {
      if (type === 'success') {
        toast.success(message);
      } else if (type === 'error') {
        toast.error(message);
      }

      // After showing the toast, hide it
      dispatch(hideToast());
    }
  }, [isVisible, message, type, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/officer" element={<OfficerLoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/fir"
          element={isAuth ? <FIRRegistration /> : <Navigate to="/" />}
        />
        <Route
          path="/fetchFIRs"
          element={isAuth ? <FIRList /> : <Navigate to="/" />}
        />
        <Route
          path="/faqs"
          element={isAuth ? <FAQs /> : <Navigate to="/" />}
        />
        <Route
          path="/ipc-details"
          element={isAuth ? <IPCDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/my-firs"
          element={isAuth ? <MyFirs /> : <Navigate to="/" />}
        />
      </Routes>

      {/* Global ToastContainer to handle global toasts */}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
