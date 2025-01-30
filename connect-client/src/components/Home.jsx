import React,{useState, useEffect} from 'react';
import logo from '../assets/logo.svg';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const Home = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [loading, setLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        setIsLoggedIn(true);  // User is logged in
        navigate("/welcome", { replace: true });  // Redirect to welcome page
    } else {
        setLoading(false);  // If not logged in, stop loading and show login
    }
}, [navigate]);
  const changeLogin = () => {
    navigate("/login");
  }
  const changeSignup = () => {
    navigate("/signup");
  }
  if (loading) {
    return <Spinner />;
}
  return (
    // have to add ".flip-2-hor-top-1"
      <div className='home-container slide-top'> 
            <div className='home-image'>
                <img src={logo} />
            </div>
            <div className='home-credential'>
                
                <h1 className='text-5xl antialiased font-bold tracking-wider'>Welcome to  <span className='text-customPurple'>connect.</span></h1>
                <p className='text-m antialiased tracking-widest'>we provide the tools to help you to connect with professionals. Join a vibrant community where innovation meets opportunity, and let your career take flight.</p>
                <div>
                <Button variant="contained" onClick={changeSignup} sx={{ backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a52e0' } }}>Sign In</Button>
                </div>
                <p className='text-md cursor-pointer'>Already a User ? <span className='text-customBlue font-semibold hover:underline' onClick={changeLogin}>Login</span></p>
            </div>

        </div>
    )
}
export default Home;