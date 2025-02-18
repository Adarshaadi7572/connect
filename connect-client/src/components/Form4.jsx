import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import { ref } from './features/user/refreshSlice';
import Spinner from './Spinner';
import { useSearchParams } from "react-router-dom";
const Form4 = () => {
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    durationFrom: '',
    durationTo: '',
    field: '',
  });
    const [searchParams] = useSearchParams();
    const VolunteerId = searchParams.get("volunteerId");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const navigate = useNavigate();
  const previosRouteHandler = () =>{
        navigate(-1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.role && formData.organization && formData.durationFrom && formData.durationTo && formData.field 
    ) {     
      setLoading(true); // Start loading
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          withCredentials: true,
        };

        // API call for sending OTP
        const response = await axios.put(`http://localhost:3000/api/v1/volunteer/${VolunteerId}`,formData, config);
        console.log('volunteeer :', response);
        toast.success('profile successfully updated');
        setLoading(false); // Stop loading after response
        dispatch(ref());
        navigate(-1);
       
      } catch (error) {
        setLoading(false); // Stop loading if there is an error
        console.log('User Profile updation failed:', error);
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
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center gap-2'>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="inputRole" className="text-gray-700 mb-2">Role</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputRole"
          name="role"
          placeholder='Your Role'
          value={formData.role}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputOrganization" className="text-gray-700 mb-2">Organization</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputOrganization"
          name="organization"
          placeholder='Organizaton Name'
          value={formData.organization}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputDurationFrom" className="text-gray-700 mb-2">Duration (From)</label>
        <input
          type="month"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputDurationFrom"
          name="durationFrom"
          value={formData.durationFrom}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputDurationTo" className="text-gray-700 mb-2">Duration (To)</label>
        <input
          type="month"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputDurationTo"
          name="durationTo"
          value={formData.durationTo}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label htmlFor="inputField" className="text-gray-700 mb-2">Field/Domain</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputField"
          name="field"
          placeholder='Feild/Domain'
          value={formData.field}
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

export default Form4;
