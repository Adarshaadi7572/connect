import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Spinner from './Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userData } from './features/user/userSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    gender: "Male",
    role: "professional"
  });
  const [loading, setLoading] = useState(true); // Initially loading

  // Check if the user is already logged in
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      navigate("/welcome", { replace: true }); // If already logged in, redirect to welcome page
    } else {
      setLoading(false); // If not logged in, stop loading and show signup form
    }
  }, [navigate]);

  const changeLogin = () => {
    navigate("/login");
  }

  const closeIcon = () => {
    navigate("/");
  }

  const dataHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }
  console.log(data);
  
  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      data.cpassword === data.password &&
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.gender &&
      data.email &&
      data.password
    ) {
      dispatch(userData(data));
      setLoading(true); // Start loading

      try {
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        };

        // API call for sending OTP
        const response = await axios.post("http://localhost:3000/api/v1/sendOTP", { email: data.email }, config);
        console.log('SignUp Response :', response);
        toast.success('Otp has been sent to your email...');
        setLoading(false); // Stop loading after response
        navigate("/otp");
      } catch (error) {
        setLoading(false); // Stop loading if there is an error
        console.log('Error in email verification:', error);
        if (error.response) {
          console.error('Response data', error.response.data);
          console.error('Response status', error.response.status);
          let errorMsg = 'Error signing up. Please try again later';
          if (error.response.status === 401) {
            toast.warning("User with this email already exists.");
          } else if (error.response.status === 500) {
            toast.warning(error.response.data.error);
          }
        }
      }
    } else {
      // Toast or error message for validation failure
      alert("Please fill all fields correctly...");
      console.error("Please fill all fields correctly or ensure passwords match.");
    }
  };

  // Show loading spinner while checking login status
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="signup-container flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="signup bg-white rounded-lg shadow-lg px-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold">
            Signup to{" "}
            <span className="text-customPurple font-bold">Connect.</span> the
            future
          </p>
          <IconButton onClick={closeIcon}>
            <CloseIcon />
          </IconButton>
        </div>

        <form className="flex flex-col gap-4">
          {/* Name Section */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-grow">
              <label htmlFor="firstName">First Name:</label>
              <input
                className="inputs p-2 border border-gray-300 rounded-md"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={dataHandler}
                required
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="lastName">Last Name:</label>
              <input
                className="inputs p-2 border border-gray-300 rounded-md"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={dataHandler}
                required
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-grow">
              <label htmlFor="email">Email:</label>
              <input
                className="inputs p-2 border border-gray-300 rounded-md"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={dataHandler}
                required
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="phone">Phone Number:</label>
              <input
                className="inputs p-2 border border-gray-300 rounded-md"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                onChange={dataHandler}
                required
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-grow">
              <label htmlFor="password">Password:</label>
              <input
                className="inputs p-2 border border-gray-300 rounded-md"
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                onChange={dataHandler}
                required
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="cpassword">Confirm Password:</label>
              <input
                className="inputs p-2 border border-gray-300 rounded-md"
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Password"
                onChange={dataHandler}
                required
              />
            </div>
          </div>

          {/* Gender Section */}
          <div className="gender-section">
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Select Gender
            </h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={data.gender === "Male"}
                  onChange={dataHandler}
                  className="accent-indigo-600"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={data.gender === "Female"}
                  onChange={dataHandler}
                  className="accent-indigo-600"
                />
                <span>Female</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={data.gender === "Other"}
                  onChange={dataHandler}
                  className="accent-indigo-600"
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6C63FF",
              color: "#fff",
              "&:hover": { backgroundColor: "#5a52e0" },
            }}
            className="w-full mt-4"
            type="submit"
            onClick={signupHandler}
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-4">
          Already a User?{" "}
          <span
            className="text-customPurple font-semibold hover:underline cursor-pointer"
            onClick={changeLogin}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
