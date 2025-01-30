import React, { useState ,useEffect, useCallback} from 'react';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Photo from '../assets/man-avatar.png';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { login } from './features/user/statusSlice';
import { useSelector } from 'react-redux';
const Navbar = () => {
  console.log("navbar renders");
  const navigate = useNavigate();
  const changeLogin = useCallback(() => {
    navigate('/login');
  }, []);
  const changeSignup = () => {
    navigate("/signup");
  };
  const logoutHandler = () =>{
      localStorage.removeItem("userData");
      loginStatus = false;
      navigate("/", {replace:true});
  }
  // let refresh = useSelector((state) => state.status).loginStatus;
  // const [loginStatus, setLoginStatus] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  const profileHandler = () => {
      navigate(`/profile/${userData.user._id}`);
  }
  // Use userData directly to determine loginStatus
  let loginStatus = userData ? true : false;

  console.log("loginStatus", loginStatus);
  // const [loginStatus, setLoginStatus] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <div className={`navbar-container fixed top-5 left-12 z-10 ${loginStatus ? '':'justify-center'}`}>
        <div className='w-[90vw] flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-customBlue'>connect.</h1>
          </div>
          <div className='allBtn flex gap-10'>
            <div className='btns flex w-32 justify-between items-center'>
              <div className='flex flex-col items-center'>
                <IconButton>
                  <WorkOutlineOutlinedIcon />

                </IconButton>

              </div>
              <div className='flex flex-col items-center'>
                <IconButton>
                  <PeopleOutlineOutlinedIcon />

                </IconButton>

              </div>
              <div className='flex flex-col items-center'>
                <IconButton>
                  <NewspaperOutlinedIcon />

                </IconButton>

              </div>

              {
                loginStatus &&
                <div className='flex flex-col'>
                  <IconButton>
                    <Badge
                      badgeContent={1}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: 'red',
                          color: 'white',
                        },
                      }}
                      max={99}
                    >
                      <NotificationsActiveIcon />
                    </Badge>
                  </IconButton>
                </div>
              }

            </div>
            <div className={`login-cred flex gap-4 items-center`} >
              {!loginStatus ? (
                <div className='login-cred flex gap-4 items-center'>
                  <div className='login'>
                    <Button
                      variant="contained"
                      onClick={changeLogin}
                      sx={{
                        backgroundColor: '#3F3D56',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#5a52e0' },
                      }}
                    >
                      login
                    </Button>
                  </div>
                  <div className='sign-up'>
                    <Button variant="outlined" onClick={changeSignup}>
                      sign up
                    </Button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-end'>
                  <div className='h-12 w-12 rounded-full bg-gray-400 ml-4 overflow-hidden hover:outline hover:outline-2 hover:outline-offset-2'>
                    <img src={Photo} alt="User Avatar" />
                  </div>
                  <Select
                    labelId="demo-simple-select-label"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        width: 0,
                        // Removes the outline
                      },
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem
                       sx={{
                        width: 250,
                        mx: 0.8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid gray',
                        backgroundColor: 'transparent !important',  // Forcefully remove background
                        '&.Mui-selected': {
                          backgroundColor: 'transparent !important',  // Forcefully remove background
                        },
                        '&.Mui-focusVisible': {
                          backgroundColor: 'transparent !important',  // Forcefully remove background
                        },
                        '&:hover': {
                          backgroundColor: 'transparent !important',  // Forcefully remove background
                          outline: '2px solid #1976d2',
                          borderRadius: '8px',
                        },
                      }}
                    >
                     Hi! {userData.user.firstName}
                    </MenuItem>

                    <MenuItem
                      sx={{
                        width: 250,
                        mx: 0.8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid gray',
                        backgroundColor: 'transparent !important',  
                        '&.Mui-selected': {
                          backgroundColor: 'transparent !important', 
                        },
                        '&.Mui-focusVisible': {
                          backgroundColor: 'transparent !important',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent !important',
                          outline: '2px solid #1976d2',
                          borderRadius: '8px',
                        },
                      }}
                      onClick={profileHandler}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      sx={{
                        width: 250,
                        mx: 0.8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:'red',
                        backgroundColor: 'transparent !important',
                        '&.Mui-selected': {
                          backgroundColor: 'transparent !important',
                        },
                        '&.Mui-focusVisible': {
                          backgroundColor: 'transparent !important',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent !important',
                          outline: '2px solid #1976d2',
                          borderRadius: '8px',
                        },
                      }}
                      onClick={logoutHandler}
                    >
                      Log Out
                    </MenuItem>


                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
