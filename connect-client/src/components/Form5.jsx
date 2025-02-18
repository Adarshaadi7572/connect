import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import { ref } from './features/user/refreshSlice';
import Spinner from './Spinner';
const Form5 = () => {
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleAddSkill = () => {
    if (skill.trim()) {
      setSkills([...skills, skill]);
      
      setSkill('');
    }
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };
  const navigate = useNavigate();
  const previosRouteHandler = () =>{
        navigate(-1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skills) {
      
      setLoading(true); // Start loading

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          withCredentials: true,
        };
        // API call for sending OTP
        console.log("skills", skills);
        const response = await axios.put(`http://localhost:3000/api/v1/skills/${userData.user._id}`,{skills}, config);
        console.log('user skills :', response);
        toast.success('skills updated successfully');
        dispatch(ref());
        setLoading(false); 
        navigate(-1)// Stop loading after response
       
      } catch (error) {
        setLoading(false); // Stop loading if there is an error
        console.log('skills updation failure', error);
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
    <form className="p-6 bg-gray-50 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleAddSkill}
        >
          Add Skill
        </button>
      </div>

      <div className="mb-6">
        {skills.length > 0 && (
          <ul className="list-disc pl-5 space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{skill}</span>
                <button
                  type="button"
                  className="text-red-500 hover:underline"
                  onClick={() => handleRemoveSkill(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-center">
        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
    <div className='h-[15rem]'>
            <IconButton onClick={previosRouteHandler}>
             <CancelIcon style={{ color: 'white' ,fontSize: 50 }}/>
            </IconButton>
     </div>
    </div>
  );
};

export default Form5;
