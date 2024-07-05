
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';

const theme = createTheme();

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    if (!userDetails.name) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);

  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  return userDetails.name ? element : null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/second" element={<ProtectedRoute element={<SecondPage />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
