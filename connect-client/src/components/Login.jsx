import React, { useState, useEffect } from 'react';
import Login_SVG from '../assets/login.svg';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { login } from './features/user/statusSlice';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ role: "professional", email: "", password: "" });
    const [toggle, setToggle] = useState(1);
    const [loading, setLoading] = useState(true);  // Initially loading
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const changeSignup = () => {
        navigate("/signup");
    };
    const toggleHandler = (value) => setToggle(value);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            setIsLoggedIn(true);  // User is logged in
            navigate("/welcome", { replace: true });  // Redirect to welcome page
        } else {
            setLoading(false);  // If not logged in, stop loading and show login
        }
    }, [navigate]);

    const changeHandler = (event) => {
        event.preventDefault();
        setData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const loginHandler = async () => {
        if (!data.email || !data.password) {
            toast.warning("please fill all the sections..");
        } else {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                const response = await axios.post("http://localhost:3000/api/v1/user_login", data, config);
                console.log("login response", response);
                localStorage.setItem("userData", JSON.stringify(response.data));
                setLoading(false);
                dispatch(login());
                navigate("/welcome");
            } catch (error) {
                setLoading(false);
                console.log("login failed ", error);
                if (error.response) {
                    console.error('Response data', error.response.data);
                    console.error('Response status', error.response.status);
                    let errorMsg = 'Error signing up. Please try again later';
                    if (error.response.status === 401) {
                        toast.warning("User is not registered..");
                    } else if (error.response.status === 400) {
                        toast.warning("Invalid authorization");
                    }
                    else if(error.response.status === 403){
                        toast.warning("Password Incorrect");
                    }
                }
            }
        }
    };

    // If still loading, don't render the login page, just show the spinner
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="login-container slide-top">
            <div className="login-image">
                <img src={Login_SVG} alt="Login Illustration" />
            </div>
            <div className="login-credential">
                <h1 className="text-4xl font-bold text-customBlue">Login Your Account</h1>
                <div className="toggle w-[64%] h-14 rounded-full bg-gray-200 mt-2 mx-4 flex items-center">
                    <button
                        className={`flex-[0.5] h-12 rounded-full flex items-center justify-center ml-1 ${
                            toggle === 1 ? 'bg-[#6C63FF] slide-left text-white' : ''
                        }`}
                        onClick={() => {
                            toggleHandler(1);
                            setData((prev) => ({
                                ...prev,
                                role: "professional"
                            }));
                        }}
                    >
                        <span>Professional</span>
                    </button>
                    <button
                        className={`flex-[0.5] h-12 rounded-full flex items-center justify-center mr-1 ${
                            toggle === 2 ? 'bg-[#6C63FF] slide-right text-white' : ''
                        }`}
                        onClick={() => {
                            toggleHandler(2);
                            setData((prev) => ({
                                ...prev,
                                role: "Admin",
                            }));
                        }}
                    >
                        <span>Admin</span>
                    </button>
                </div>
                <div className="login-box flex-wrap">
                    <TextField
                        sx={{ width: '45ch' }}
                        id="standard-basic"
                        label="Enter User Name"
                        variant="standard"
                        color="secondary"
                        name="email"
                        onChange={changeHandler}
                    />
                    <TextField
                        sx={{ width: '45ch' }}
                        id="outlined-password-input"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="standard"
                        autoComplete="current-password"
                        color="secondary"
                        name="password"
                        onChange={changeHandler}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            width: '56ch',
                            backgroundColor: '#6C63FF',
                            marginTop: '20px',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#5a52e0' },
                        }}
                        onClick={loginHandler}
                    >
                        Login
                    </Button>
                </div>
                <div className="w-[27rem] flex justify-between">
                    <p className="text-md">
                        New on Connect?{' '}
                        <span
                            className="text-customBlue cursor-pointer font-semibold hover:underline"
                            onClick={changeSignup}
                        >
                            create account
                        </span>
                    </p>
                    <p className="hover:underline text-md cursor-pointer font-bold hover:text-black">
                        Reset Password
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

