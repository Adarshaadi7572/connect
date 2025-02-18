import React, { useState, useEffect } from 'react';
import Photo from '../assets/man-avatar.png';
import Mmmut from '../assets/mmmut.jpg';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Skeleton } from '@mui/material';
import Tech from '../assets/techsrijan.jpg';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Spinner from './Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import { ref } from './features/user/refreshSlice';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify';
const Profile = () => {
    const navigate = useNavigate();
    const path = useLocation();
    const dispatch = useDispatch();
    // State for the profile photo
    const refreshKey = useSelector((state) => state.refresh).refreshKey;
    console.log("refreshKey", refreshKey);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [userDetails, setUserData] = useState({});
    console.log(userData);
    const [loading, setLoading] = useState(true);

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
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                    withCredentials: true,
                };

                const response = await axios.get(
                    `http://localhost:3000/api/v1/getuser/${userData.user._id}`,
                    config
                );

                console.log("userDetails", response.data);
                setUserData(response.data.userDetails);
            } catch (error) {
                console.error("Error fetching user details:", error);
                alert("Error in fetching User Details, Plese Login Again");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [refreshKey]);
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }
    //for navigation to several forms 
    console.log(loading);
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
                                        <AddAPhotoIcon sx={{ fontSize: "2rem" }} />
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
                            {
                                loading ? (
                                    <>
                                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                    </>
                                ) :
                                    (
                                        <>
                                            <h1 className='font-bold text-2xl text-center'>{userData.user.firstName} {userData.user.lastName}</h1>
                                            <p className='font-semibold text-center'>{userDetails?.status?.position}</p>
                                            <p className='text-center'>{userDetails?.status?.city} {userDetails?.status?.state} {userDetails?.status?.zip}</p>
                                        </>
                                    )
                            }
                        </div>

                    </div>
                    <div className='mr-5'>
                        {
                            loading ? (
                                <div className='flex items-center gap-2'>
                                    <Skeleton variant="circular" width={45} height={45} />
                                    <Skeleton variant="text" sx={{ fontSize: '3rem', width: '20rem' }} />
                                </div>

                            ) : (
                                <>
                                    <img src="" alt="" />
                                    <span className='text-lg font-semibold mr-3'>{userDetails?.status?.organization}</span>
                                    <IconButton onClick={() => navigate(`${path.pathname}/details`)}>
                                        <ModeEditIcon />

                                    </IconButton>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-5'>

                    <div className='eduaction min-h-16 bg-blue-50 mx-4 rounded-lg overflow-auto'>
                        <div className='flex justify-between mx-4 mt-3'>
                            <h1 className='text-2xl font-bold'>Education</h1>
                            <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/education`)}>
                                <AddIcon />

                            </IconButton>

                        </div>
                        {
                            loading ? (
                                <div className='flex mx-4 justify-between mt-4'>

                                    <div className='flex gap-6'>
                                        <Skeleton variant="circular" sx={{ fontSize: '3rem', width: '4rem' }} />
                                        <div>
                                            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                        </div>
                                    </div>

                                    <div className='flex gap-3'>
                                        <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
                                        <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
                                    </div>
                                </div>
                            ) : (

                                userDetails?.education?.map((edu, index) => {
                                    return (
                                        <>

                                            <div key={index} className='flex mx-4 justify-between mt-4'>

                                                <div className='flex gap-6'>
                                                    <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                                                        <img src={Mmmut} />

                                                    </div>
                                                    <div>
                                                        <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>{edu?.collegeName}</h1>
                                                        <p className='text-md opacity-3'>{edu?.degree}</p>
                                                        <p className='text-sm text-gray-500'>{`${formatDate(edu?.from)} - ${formatDate(edu?.to)}`}</p>
                                                        <p>{`Grade - ${edu?.grade}`}</p>
                                                    </div>
                                                </div>

                                                <div className='flex gap-3'>
                                                    <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/education?educationId=${edu?._id}`)}>
                                                        <ModeEditIcon />

                                                    </IconButton>
                                                    <IconButton className='h-10' onClick={async () => {
                                                        try {
                                                            setLoading(true);

                                                            const config = {
                                                                headers: {
                                                                    Authorization: `Bearer ${userData.token}`,
                                                                },
                                                                withCredentials: true,
                                                            };
                                                            const response = await axios.delete(`http://localhost:3000/api/v1/education/${edu?._id}`, config);
                                                            console.log('After Deletion:', response);
                                                            toast.success('Successfully Deleted');
                                                            setLoading(false);
                                                            dispatch(ref());
                                                        } catch (error) {
                                                            setLoading(false);
                                                             console.log(error);
                                                             toast.warning("Failed");
                                                        }
                                                    }}>
                                                        <DeleteIcon />

                                                    </IconButton>

                                                </div>
                                            </div>
                                            <hr className='font-bold mx-4 mt-1' />
                                        </>
                                    )
                                })
                            )
                        }
                    </div>
                    <div className='project min-h-16 bg-blue-50 mx-4 rounded-lg'>
                        <div className='flex justify-between mx-4 mt-3 items-center'>
                            <h1 className='text-2xl font-bold'>Projects</h1>
                            <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/projectDetails`)}>
                                <AddIcon />

                            </IconButton>

                        </div>
                        {
                            loading ? (<div className='flex justify-between'>
                                <div className='flex mx-4 flex-col mt-4'>

                                    <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                </div>
                                <div className='flex justify-between mx-4 mt-3'>
                                    <div className='flex gap-3'>
                                        <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
                                        <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
                                    </div>
                                </div>
                            </div>) : (
                                userDetails?.projects?.map((project, index) => {
                                    return (
                                        <>
                                            <div key={index} className='flex justify-between'>
                                                <div className='flex mx-4 flex-col my-3'>

                                                    <h1 className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>{project.projectName}</h1>
                                                    <p className='text-md opacity-3'>{`${formatDate(project?.durationFrom)} - ${formatDate(project?.durationTo)}`}</p>
                                                    <p className='text-sm text-gray-500'>{project.projectDescription}</p>
                                                    <p>{`Project Link:  ${project.projectLink}`}</p>

                                                </div>
                                                <div className='flex justify-between mx-4 mt-3'>
                                                    <div className='flex'>
                                                        <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/projectDetails?projectId=${project?._id}`)}>
                                                            <ModeEditIcon />

                                                        </IconButton>
                                                        <IconButton className='h-10' onClick={ async() => {
                                                              try {
                                                                setLoading(true);
    
                                                                const config = {
                                                                    headers: {
                                                                        Authorization: `Bearer ${userData.token}`,
                                                                    },
                                                                    withCredentials: true,
                                                                };
                                                                const response = await axios.delete(`http://localhost:3000/api/v1/project/${project?._id}`, config);
                                                                console.log('After Deletion:', response);
                                                                toast.success('Successfully Deleted');
                                                                setLoading(false);
                                                                dispatch(ref());
                                                            } catch (error) {
                                                                setLoading(false);
                                                                 console.log(error);
                                                                 toast.warning("Failed");
                                                            }
                                                        }}>
                                                            <DeleteIcon />

                                                        </IconButton>

                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })
                            )
                        }
                    </div>
                    <div className='Volunteering min-h-16 bg-blue-50 mx-4 rounded-lg'>
                        <div className='flex justify-between mx-4 mt-3'>
                            <h1 className='text-2xl font-bold '>Voluteering</h1>
                            <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/volunteer`)}>
                                <AddIcon />

                            </IconButton>

                        </div>
                        {
                            loading ? (
                                <div className=' flex justify-between'>
                                    <div className='flex gap-6 mx-4 mt-3'>
                                        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
                                            <Skeleton variant="circular" sx={{ fontSize: '3rem', width: '4rem' }} />
                                        </div>
                                        <div>
                                            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
                                        </div>
                                    </div>
                                    <div className='flex justify-between mx-4 mt-3'>
                                        <div className='flex gap-3'>
                                            <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
                                            <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                userDetails?.volunteering?.map((vol, index) => {
                                    return (
                                        <>
                                            <div key={index} className=' flex justify-between'>
                                                <div className='flex gap-6 mx-4 my-3'>
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
                                                <div className='flex justify-between mx-4 mt-3'>
                                                    <div className='flex gap-3'>
                                                        <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/volunteer?volunteerId=${vol?._id}`)}>
                                                            <ModeEditIcon />

                                                        </IconButton>
                                                        <IconButton className='h-10' onClick={async () => {
                                                             try {
                                                                setLoading(true);
    
                                                                const config = {
                                                                    headers: {
                                                                        Authorization: `Bearer ${userData.token}`,
                                                                    },
                                                                    withCredentials: true,
                                                                };
                                                                const response = await axios.delete(`http://localhost:3000/api/v1/volunteer/${vol?._id}`, config);
                                                                console.log('After Deletion:', response);
                                                                toast.success('Successfully Deleted');
                                                                setLoading(false);
                                                                dispatch(ref());
                                                            } catch (error) {
                                                                setLoading(false);
                                                                 console.log(error);
                                                                 toast.warning("Failed");
                                                            }
                                                        }}>
                                                            <DeleteIcon />

                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })
                            )
                        }
                    </div>

                    <div className='skills min-h-16 bg-blue-50 mx-4 rounded-lg mb-4'>
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
                            {
                                loading ? (
                                    <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
                                ) : (

                                    userDetails?.skills?.map((skill, index) => {
                                        return (
                                            <>
                                                <h1 key={index} className='font-semibold hover:underline hover:text-blue-400 cursor-pointer'>{skill}</h1>
                                                <hr />
                                            </>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-[0.3] bg-white rounded-lg h-screen min-h-screen'>
                <h1 className='ml-4 font-semibold text-xl mt-3 '>You may also know them</h1>
                <p className='text-sm text-gray-500 ml-5 mb-3'>suugested to you</p>
                <hr />
                <div className='flex flex-col'>
                    {
                        loading ? (
                            <div className='w-full h-screen flex justify-center items-center'>
                                <Spinner />
                            </div>
                        ) : (
                            userDetails?.connection?.map((member, index) => {
                                return (
                                    <div key={index} className='flex gap-4 mx-4 mt-2 items-center bg-blue-50 rounded-lg h-24 pl-3 relative'>
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
                                )
                            })
                        )
                    }
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