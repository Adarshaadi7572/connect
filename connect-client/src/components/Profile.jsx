import React, { useState, useEffect } from 'react';
import Photo from '../assets/man-avatar.png';
import Mmmut from '../assets/mmmut.jpg';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Tech from '../assets/techsrijan.jpg';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Spinner from './Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const Profile = () => {
    const navigate = useNavigate();
    const path = useLocation();
    // State for the profile photo
    const userData = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {


        if (!userData) {
            navigate('/login');
        }

    }, []);
    if (!userData) {
        return <Spinner />
    }
    const [profilePhoto, setProfilePhoto] = useState(Photo);

    // State for cropping
    const [uploadedImage, setUploadedImage] = useState(null);
    const [cropper, setCropper] = useState(null);

    // Handle file input change
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result); // Set the uploaded image for cropping
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle crop and save
    const handleCrop = () => {
        if (cropper) {
            const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get the cropped image as a base64 string
            setProfilePhoto(croppedImage); // Update the profile photo
            setUploadedImage(null); // Close the cropping modal
        }
    };
    //for navigation to several forms 
    return (

        <div className='profile-container mt-20 gap-4'>
            {/* <div className='absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center gap-2'> */}
            <Outlet />
            {/* </div> */}
            <div className='head h-50 bg-white rounded-lg flex-[0.7]'>
                <div className='bg-purple-400 h-44 rounded-lg '>

                </div>
                <div className='flex justify-between h-52 relative mt-3'>
                    <div className='ml-8'>
                        <div className="relative group">
                            {/* Image Container */}
                            <div className="w-[11rem] h-[11rem] flex items-center justify-center rounded-full bg-white absolute -top-24 left-14">
                                <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden relative">
                                    <img
                                        src={profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
                                    />
                                    {/* Upload Button */}
                                    <label
                                        htmlFor="upload-photo"
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                    >
                                        <AddAPhotoIcon sx={{fontSize:"2rem"}}/> 
                                    </label>
                                    <input
                                        type="file"
                                        id="upload-photo"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mt-20'>
                            <h1 className='font-bold text-2xl text-center'>Adarsh Srivastava</h1>
                            <p className='font-semibold text-center'>Full stack developer || Mern || DSA</p>
                            <p className='text-center'>Gorakhpur,Uttar Pradesh, India</p>
                        </div>

                    </div>
                    <div className='mr-5'>
                        <img src="" alt="" />
                        <span className='text-lg font-semibold mr-3'>Madan Mohan Malaviya University of Technology</span>
                        <IconButton onClick={() => navigate(`${path.pathname}/details`)}>
                            <ModeEditIcon />

                        </IconButton>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>

                    <div className='experience h-44 bg-blue-50 mx-4 rounded-lg'>
                        <div className='flex justify-between mx-4 mt-3'>
                            <h1 className='text-2xl font-bold '>Education</h1>
                            <div className='flex gap-3'>
                                <IconButton onClick={() => navigate(`${path.pathname}/education`)}>
                                    <ModeEditIcon />

                                </IconButton>
                                <IconButton onClick={() => navigate(`${path.pathname}/education`)}>
                                    <AddIcon />

                                </IconButton>
                            </div>
                        </div>
                        <div className='flex gap-6 mx-4 mt-3'>
                            <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                                <img src={Mmmut} />

                            </div>
                            <div>
                                <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Madan Mohan Malaviya University of Technology</h1>
                                <p className='text-md opacity-3'>Bachelors of Technology - BTech, Chemical Engineering</p>
                                <p className='text-sm text-gray-500'>Jul 2021 - Jul 2025</p>
                                <p>Grade: 7</p>
                            </div>
                        </div>
                    </div>
                    <div className='project h-52 bg-blue-50 mx-4 rounded-lg'>
                        <div className='flex justify-between mx-4 mt-3'>
                            <h1 className='text-2xl font-bold '>Projects</h1>
                            <div className='flex gap-3'>
                                <IconButton onClick={() => navigate(`${path.pathname}/projectDetails`)}>
                                    <ModeEditIcon />

                                </IconButton>
                                <IconButton onClick={() => navigate(`${path.pathname}/projectDetails`)}>
                                    <AddIcon />

                                </IconButton>
                            </div>
                        </div>
                        <div className='flex mx-4 flex-col mt-4'>

                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Chat Applicaiton</h1>
                            <p className='text-md opacity-3'>May 2024 - Present</p>
                            <p className='text-sm text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet neque vitae inventore impedit voluptate, iste ex reiciendis consectetur atque quo officiis a incidunt accusantium officia quasi dicta hic tempore explicabo! Voluptates, id!</p>
                            <p>Projet Link:</p>

                        </div>
                    </div>
                    <div className='Volunteering h-44 bg-blue-50 mx-4 rounded-lg'>

                        <div className='flex justify-between mx-4 mt-3'>
                            <h1 className='text-2xl font-bold '>Voluteering</h1>
                            <div className='flex gap-3'>
                                <IconButton onClick={() => navigate(`${path.pathname}/volunteer`)}>
                                    <ModeEditIcon />

                                </IconButton>
                                <IconButton onClick={() => navigate(`${path.pathname}/volunteer`)}>
                                    <AddIcon />

                                </IconButton>
                            </div>
                        </div>
                        <div className='flex gap-6 mx-4 mt-3'>
                            <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                                <img src={Tech} />

                            </div>
                            <div>
                                <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Executive Member</h1>
                                <p className='text-md opacity-3'>Techsrijan'2023</p>
                                <p className='text-sm text-gray-500'>Jul 2021 - Jul 2025</p>
                                <p className='text-sm text-gray-500'>Science and Tecnology</p>
                            </div>
                        </div>
                    </div>

                    <div className='skills min-h-44 bg-blue-50 mx-4 rounded-lg mb-4'>
                        <div className='flex justify-between mx-4 mt-3'>
                            <h1 className='text-2xl font-bold '>Skills</h1>
                            <div className='flex gap-3'>
                                <IconButton onClick={() => navigate(`${path.pathname}/skills`)}>
                                    <ModeEditIcon />

                                </IconButton>
                                <IconButton onClick={() => navigate(`${path.pathname}/skills`)}>
                                    <AddIcon />

                                </IconButton>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6 mx-4 mt-3 mb-4'>
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>React.js</h1>
                            <hr />
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Tailwind.js</h1>
                            <hr />
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Express.js</h1>
                            <hr />
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>MongoDB</h1>
                            <hr />
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Socket.io</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-[0.3] bg-white rounded-lg'>
                <h1 className='ml-4 font-semibold text-xl mt-3 '>You may also know them</h1>
                <p className='text-sm text-gray-500 ml-5 mb-3'>suugested to you</p>
                <hr />
                <div className='flex flex-col'>
                    <div className='flex gap-4 mx-4 mt-2 items-center bg-blue-50 rounded-lg h-24 pl-3 relative'>
                        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                            <img src={Mmmut} />

                        </div>
                        <div>
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Abhishek Srivastava</h1>
                            <p className='text-md opacity-3'>Full stack developer || Mern || DSA</p>
                        </div>
                        <div className='absolute right-2 top-2'>
                            <IconButton>
                                <PersonAddAltIcon />

                            </IconButton>
                        </div>
                    </div>

                    <div className='flex gap-4 mx-4 mt-2 items-center bg-blue-50 rounded-lg h-24 pl-3 relative'>
                        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                            <img src={Mmmut} />

                        </div>
                        <div>
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Abhishek Srivastava</h1>
                            <p className='text-md opacity-3'>Full stack developer || Mern || DSA</p>
                        </div>
                        <div className='absolute right-2 top-2'>
                            <IconButton>
                                <PersonAddAltIcon />

                            </IconButton>
                        </div>
                    </div>
                    <div className='flex gap-4 mx-4 mt-2 items-center bg-blue-50 rounded-lg h-24 pl-3 relative'>
                        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                            <img src={Mmmut} />

                        </div>
                        <div>
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Abhishek Srivastava</h1>
                            <p className='text-md opacity-3'>Full stack developer || Mern || DSA</p>
                        </div>
                        <div className='absolute right-2 top-2'>
                            <IconButton>
                                <PersonAddAltIcon />

                            </IconButton>
                        </div>
                    </div>
                    <div className='flex gap-4 mx-4 mt-2 items-center bg-blue-50 rounded-lg h-24 pl-3 relative'>
                        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                            <img src={Mmmut} />

                        </div>
                        <div>
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Abhishek Srivastava</h1>
                            <p className='text-md opacity-3'>Full stack developer || Mern || DSA</p>
                        </div>
                        <div className='absolute right-2 top-2'>
                            <IconButton>
                                <PersonAddAltIcon />

                            </IconButton>
                        </div>
                    </div>
                    <div className='flex gap-4 mx-4 mt-2 items-center bg-blue-50 rounded-lg h-24 pl-3 relative'>
                        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                            <img src={Mmmut} />

                        </div>
                        <div>
                            <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>Abhishek Srivastava</h1>
                            <p className='text-md opacity-3'>Full stack developer || Mern || DSA</p>
                        </div>
                        <div className='absolute right-2 top-2'>
                            <IconButton>
                                <PersonAddAltIcon />

                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            {uploadedImage && (
                <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Crop Your Image</h2>
                        <Cropper
                            src={uploadedImage}
                            style={{ height: 300, width: '100%' }}
                            aspectRatio={1} // Keep the crop area square
                            guides={false}
                            viewMode={1}
                            dragMode="move"
                            onInitialized={(instance) => setCropper(instance)}
                        />
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => setUploadedImage(null)} // Close modal without saving
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleCrop} // Save the cropped image
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
export default Profile;