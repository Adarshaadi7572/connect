import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
const Form3 = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    durationFrom: '',
    durationTo: '',
    projectDescription: '',
    projectLink: '',
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center gap-2'>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="inputProjectName" className="text-gray-700 mb-2">Project Name</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputProjectName"
          name="projectName"
          placeholder='Enter Project Name'
          value={formData.projectName}
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
        <label htmlFor="inputProjectDescription" className="text-gray-700 mb-2">Project Description</label>
        <textarea
          className="p-3 border border-gray-300 rounded-lg"
          id="inputProjectDescription"
          name="projectDescription"
          placeholder='Project Description'
          rows="4"
          value={formData.projectDescription}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="flex flex-col md:col-span-2">
        <label htmlFor="inputProjectLink" className="text-gray-700 mb-2">Project Link</label>
        <input
          type="url"
          className="p-3 border border-gray-300 rounded-lg"
          id="inputProjectLink"
          name="projectLink"
          placeholder='Project Link'
          value={formData.projectLink}
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
  )
}

export default Form3;
