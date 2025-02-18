import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import { ref } from './features/user/refreshSlice';
const Form1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: '',
    city: '',
    state: '',
    zip: '',
    
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const previosRouteHandler = () =>{
    navigate(-1);
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name && formData.position && formData.organization && formData.city && formData.state && formData.zip 
    ) {
      
      setLoading(true); // Start loading
      console.log("userData token", userData.token);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          withCredentials: true,
        };
        
        // API call for sending OTP
        console.log(formData)
        
        const response = await axios.put(`http://localhost:3000/api/v1/details/${userData.user._id}`,formData, config);
        console.log('user profile :', response);
        toast.success('profile successfully updated');
        setLoading(false); 
        dispatch(ref());
        navigate(-1);
        // Stop loading after response
       
      } catch (error) {
        setLoading(false); // Stop loading if there is an error
        console.log('Error in updating details', error);
        if (error.response) {
          console.error('Response data', error.response.data);
          console.error('Response status', error.response.status);
        }
      }
    } else {
      // Toast or error message for validation failure
      alert("Please fill all fields correctly...");
      console.error("Please fill all fields correctly or ensure passwords match.");
    }
  };
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];
  if (loading) {
    return <Spinner />;
  }
  return (
  <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center gap-2 '>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="inputName" className="text-gray-700 mb-2">Name</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputName"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputPosition" className="text-gray-700 mb-2">Position</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputPosition"
          name="position"
          placeholder="Enter you position"
          value={formData.position}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col col-span-2">
        <label htmlFor="inputAddress" className="text-gray-700 mb-2">Organization</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputAddress"
          name="organization"
          placeholder="Enter Your Organization"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputCity" className="text-gray-700 mb-2">City</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputCity"
          name="city"
          placeholder='City'
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputState" className="text-gray-700 mb-2">State</label>
        <select
          id="inputState"
          className="p-3 border border-gray-300 rounded-lg"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option>Choose...</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputZip" className="text-gray-700 mb-2">Zip</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputZip"
          name="zip"
          placeholder='Zip/Pin code'
          value={formData.zip}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-2">
        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
      </div>
    </form>
     <div className='h-[40rem]'>
            <IconButton onClick={previosRouteHandler}>
             <CancelIcon style={{ color: 'white' ,fontSize: 50 }}/>
            </IconButton>
     </div>
    </div>
  );
};

export default Form1;

