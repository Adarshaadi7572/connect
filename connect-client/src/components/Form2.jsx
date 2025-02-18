import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { ref } from './features/user/refreshSlice';
const Form2 = () => {
  const [formData, setFormData] = useState({
    degree: '',
    collegeName: '',
    degreeWithMajors: '',
    durationFrom: '',
    durationTo: '',
    grade: '',
  });
  const [searchParams] = useSearchParams();
  const EducationId = searchParams.get("educationId");
  
  const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);
   const userData = JSON.parse(localStorage.getItem("userData"));
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  console.log(formData);
  const navigate = useNavigate();
  const previosRouteHandler = () =>{
        navigate(-1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.degree && formData.collegeName && formData.degreeWithMajors && formData.durationFrom && formData.durationTo && formData.grade 
    ) {
      
     setLoading(true); // Start loading
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          withCredentials: true,
        };

       
        const response = await axios.put(`http://localhost:3000/api/v1/education/${EducationId}`,formData, config);
        console.log('user profile :', response);
        toast.success('profile successfully updated');
        setLoading(false); 
        dispatch(ref());
        navigate(-1);
      } catch (error) {
        setLoading(false); 
        console.log('Error in email verification:', error);
        if (error.response) {
          console.error('Response data', error.response.data);
          console.error('Response status', error.response.status);
        }
      }
    } else {
    
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
        <label htmlFor="inputDegree" className="text-gray-700 mb-2">Degree</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputDegree"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputCollegeName" className="text-gray-700 mb-2">College Name</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputCollegeName"
          name="collegeName"
          placeholder='Enter Your College Name'
          value={formData.collegeName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputDegreeWithMajors" className="text-gray-700 mb-2"> Majors</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputDegreeWithMajors"
          name="degreeWithMajors"
          placeholder='Majors'
          value={formData.degreeWithMajors}
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

      <div className="flex flex-col">
        <label htmlFor="inputGrade" className="text-gray-700 mb-2">Grade / Percentage</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputGrade"
          name="grade"
          placeholder='Grade'
          value={formData.grade}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2">
        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
      </div>
    </form>
    <div className='h-[30rem]'>
            <IconButton onClick={previosRouteHandler}>
             <CancelIcon style={{ color: 'white' ,fontSize: 50 }}/>
            </IconButton>
     </div>
    </div>
  );
};

export default Form2;
