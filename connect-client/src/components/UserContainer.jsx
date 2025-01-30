import React,{useEffect} from 'react';
import Photo from '../assets/man-avatar.png';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Fab from '@mui/material/Fab';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { login } from './features/user/statusSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
const UserContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(1);
    let loginStatus = useSelector((state) => state.status).loginStatus;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const toggleOneHandler = () => {
        if (toggle != 1) {
            setToggle(1)
        }
    }
    const toggleTwoHandler = () => {
        if (toggle != 2) {
            setToggle(2)
        }
    }
    const conversations = [
        {
            _id: "conversation1",
            users: [
                { _id: "user1", name: "John Doe" },
                { _id: "user2", name: "Adarsh Srivastava" }, // Assuming `userData._id` matches this
            ],
            latestMessage: {
                content: "Hey there! How's it going?",
                timeStamp: "2024-12-07T14:00:00Z",
            },
        },
        {
            _id: "conversation2",
            users: [
                { _id: "user3", name: "Jane Smith" },
                { _id: "user2", name: "Adarsh Srivastava" },
            ],
            latestMessage: {
                content: "Are we still on for the meeting tomorrow?",
                timeStamp: "2024-12-06T18:30:00Z",
            },
        },
        {
            _id: "conversation3",
            users: [
                { _id: "user4", name: "Chris Martin" },
                { _id: "user2", name: "Adarsh Srivastava" },
            ],
            latestMessage: null, // No previous message
        },
    ];
  const postHandler = () => {
       navigate('/post/1');
  }
  const viewmoreHandler = () => {
    navigate('/profile/1');
  }
  useEffect(() => {
 
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!userData) {
        navigate('/login');
      } else {
        if(!loginStatus){
            toast.success("Login success!");
            console.log("userData", userData);
            dispatch(login());
        }
      }

  }, []);
   if(!userData){
    return <Spinner/>
   }
   
    return (
        <div className='user-container mt-20'>
            <div className='user-profile relative'>
                <div className="custom-shape-divider-top-1733409435">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>
                <div className='w-[30%] h-[22%] rounded-full bg-white absolute top-[3rem] right-[8.8rem] flex items-center justify-center'>
                    <div className='w-[87%] h-[87%] rounded-full overflow-hidden'>
                      <img src={Photo} />

                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className='text-center font-semibold text-2xl'>{userData.user.firstName} {userData.user.lastName}</h1>
                    <p className='text-center'>Mern Stack Developer || CPP DSA</p>
                </div>
                <hr className='mt-3 font-semibold' />
                <div>

                    <div className='flex justify-between mt-4 mx-4'>
                        <div className='flex gap-2'>
                            <BusinessIcon sx={{ color: '#6C63FF' }} />
                            <p>Company</p>
                        </div>
                        <span className='mr-5'>Amazon</span>

                    </div>
                    <div className='flex justify-between mt-4 mx-4'>
                        <div className='flex gap-2'>
                            <GroupsIcon sx={{ color: '#6C63FF' }} />
                            <p>Connection</p>
                        </div>
                        <span className='mr-5 text-blue-400'>50</span>
                    </div>
                    <div className='flex justify-between mt-4 mx-4'>
                        <div className='flex gap-2'>
                            <MyLocationIcon sx={{ color: '#6C63FF' }} />
                            <p>Location</p>
                        </div>
                        <span className='mr-5'>Pratapgarh</span>
                    </div>

                </div>
                <hr className='mt-3 font-semibold' />
                <div className='mx-4 mt-4 h-24'>
                    <p className=''>Skills</p>
                    <div className='flex flex-wrap gap-4 mt-2'>
                        <span className='bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white rounded-md p-1 px-2 text-sm tracking-wide'>HTML</span>
                        <span className='bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white rounded-md p-1 px-2 text-sm tracking-wide'>CSS</span>
                        <span className='bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white rounded-md p-1 px-2 text-sm tracking-wide'>Javascript</span>
                        <span className='bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white rounded-md p-1 px-2 text-sm tracking-wide'>React.js</span>
                        <span className='bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white rounded-md p-1 px-2 text-sm tracking-wide'>Express.js</span>
                    </div>
                </div>
                <div className='mt-8 h-8 bg-[#6C63FF] mx-4 p-4 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-500/50 group'>
                        <span className='text-white font-semibold text-sm group-hover:text-gray-200' >View More</span>
                    <IconButton onClick={viewmoreHandler}>
                        <OpenInNewIcon className='text-white group-hover:text-gray-200' />

                    </IconButton>
                </div>
            </div>
            <div className='post-container'>
                <div className='post-create flex items-center justify-center overflow-hidden'>
                    <div className='w-[13%] h-[114%] bg-gray-200 rounded-full flex items-center justify-center'>

                        <Fab sx={{ backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a52e0' } }} onClick={postHandler} aria-label="add">
                            
                            <AddIcon/>
                        </Fab>


                    </div>
                </div>
                {/* posts start here */}
                <div className='posts flex flex-col justify-between '>
                    <div>

                        <div className='Header flex justify-between ml-4 mt-4'>
                            <div className='flex gap-3'>
                                <img src="" alt="" srcset="" className='w-14 h-14 bg-gray-200 rounded-full' />
                                <div>
                                    <p className='text-black font-semibold'>{userData.user.firstName} {userData.user.lastName}</p>
                                    <p className='text-sm '>full stack Developer || search analyst</p>
                                </div>
                            </div>
                            <div className='mr-4'>
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='content w-[90%] mt-4 ml-4'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia maxime deserunt iste, quod sed odit maiores id unde consequuntur, consectetur expedita. Aliquam, id dolorum nemo veritatis exercitationem eius eum ex amet sint doloribus numquam, error tempore facilis, tenetur ea assumenda consectetur molestias quo fugit quibusdam earum! Dolor, minus nemo! Alias praesentium voluptatum pariatur, itaque fugit voluptatem deserunt tenetur sunt, dicta est ullam? Voluptatum dolores accusamus voluptas voluptate qui at architecto nostrum quidem harum cupiditate voluptates nam, commodi dolor vitae reprehenderit laborum ipsa. Quis iste molestias quisquam iure omnis nostrum mollitia quo delectus in deserunt, sed ipsa
                        </div>
                        <div className='post-image'>
                            <img src="" alt="" srcset="" className='w-[90%] mt-4 ml-4 text-center bg-gray-600' />
                        </div>

                    </div>

                    <div className='status flex flex-col justify-between mx-8 mb-4'>
                        <hr/>
                        <div className='flex justify-between mt-2'>
                            <div>
                                <IconButton>
                                    <ThumbUpOffAltIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton>
                                    <MessageIcon />

                                </IconButton>
                            </div>
                            <div>
                                <IconButton>
                                    <SendIcon />

                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='posts flex flex-col justify-between mb-4'>
                    <div>

                        <div className='Header flex justify-between ml-4 mt-4'>
                            <div className='flex gap-3'>
                                <img src="" alt="" srcset="" className='w-14 h-14 bg-gray-200 rounded-full' />
                                <div>
                                    <p className='text-black font-semibold'>{userData.user.firstName} {userData.user.lastName}</p>
                                    <p className='text-sm '>full stack Developer || search analyst</p>
                                </div>
                            </div>
                            <div className='mr-4'>
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='content w-[90%] mt-4 ml-4'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia maxime deserunt iste, quod sed odit maiores id unde consequuntur, consectetur expedita. Aliquam, id dolorum nemo veritatis exercitationem eius eum ex amet sint doloribus numquam, error tempore facilis, tenetur ea assumenda consectetur molestias quo fugit quibusdam earum! Dolor, minus nemo! Alias praesentium voluptatum pariatur, itaque fugit voluptatem deserunt tenetur sunt, dicta est ullam? Voluptatum dolores accusamus voluptas voluptate qui at architecto nostrum quidem harum cupiditate voluptates nam, commodi dolor vitae reprehenderit laborum ipsa. Quis iste molestias quisquam iure omnis nostrum mollitia quo delectus in deserunt, sed ipsa
                        </div>
                        <div className='post-image'>
                            <img src="" alt="" srcset="" className='w-[90%] mt-4 ml-4 text-center bg-gray-600' />
                        </div>

                    </div>

                    <div className='status flex flex-col justify-between mx-8 mb-4'>
                        <hr/>
                        <div className='flex justify-between mt-2'>
                            <div>
                                <IconButton>
                                    <ThumbUpOffAltIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton>
                                    <MessageIcon />

                                </IconButton>
                            </div>
                            <div>
                                <IconButton>
                                    <SendIcon />

                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                {/* posts section ends here */}
            </div>
            <div className='message-container'>
                <div className='toggle w-[90%] h-16 rounded-full bg-gray-200 mt-4 mx-4 flex items-center'>
                    <button className={`flex-[0.5]  h-14 rounded-full flex items-center justify-center ml-1 ${toggle == 1 ? 'bg-[#6C63FF] slide-left text-white' : ''}`} onClick={toggleOneHandler}>
                        <span >Trending</span>
                    </button>
                    <button className={`flex-[0.5] h-14 rounded-full flex items-center justify-center mr-1 ${toggle == 2 ? 'bg-[#6C63FF] slide-right text-white' : ''}`} onClick={toggleTwoHandler}>
                        <span>connection</span>
                    </button>
                </div>
                <div>
                    {
                        toggle == 2 &&
                        <div className={` rounded-md py-[5px] px-[5px] m-[10px] flex flex-col grow-[1] sb-conversation`}>
                            {conversations.map((conversation, index) => {
                                console.log("conversation", conversation);

                                var chatName = "";
                                conversation.users.map((user) => {
                                    if (user._id != 'user2') {
                                        chatName = user.name;
                                    }
                                });

                                if (conversation.latestMessage === null) {

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                console.log("Refresh fired from sidebar");
                                                // dispatch(refreshSidebarFun());

                                            }}

                                        >
                                            <div
                                                key={index}
                                                className="conversation-container"
                                            // onClick={() => {
                                            //     Navigate(
                                            //         "chat/" +
                                            //         conversation._id +
                                            //         "&" +
                                            //         chatName
                                            //     );
                                            // }}

                                            >
                                                <p className={"con-icon"}>
                                                    {chatName[0]}
                                                </p>
                                                <p className={"con-title"}>
                                                    {chatName}
                                                </p>

                                                <p className="con-lastMessage">
                                                    No previous Messages, click here to start a new chat
                                                </p>

                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className="conversation-container"
                                        // onClick={() => {
                                        //     Navigate(
                                        //         "chat/" +
                                        //         conversation._id +
                                        //         "&" +
                                        //         chatName
                                        //     );
                                        // }}
                                        >
                                            <p className={"con-icon"}>
                                                {chatName[0]}
                                            </p>
                                            <p className={"con-title"}>
                                                {chatName}
                                            </p>

                                            <p className="con-lastMessage">
                                                {
                                                    conversation.latestMessage.content ? conversation.latestMessage.content : "No previous Messages"
                                                }
                                            </p>

                                        </div>
                                    );
                                }
                            })}
                        </div>
                    }
                    {
                        toggle == 1 &&
                        <div className='rounded-md py-[5px] px-[5px] m-[10px] flex flex-col grow-[1] sb-conversation'>
                            <div className='conversation-container flex items-center gap-5'>
                                <TrendingUpIcon />
                              <div className='flex-[0.9] flex-col flex gap-1 justify-around'>
                                 <p className='font-seibold'>Lorem ipsum dolor sit amet</p>
                                 <div className='flex justify-between'>
                                    <p className='text-sm text-gray-600'>2D before</p>
                                    <a className='text-[#6C63FF] hover:underline text-sm'>Read More</a>
                                 </div>  
                               </div>
                            </div>
                            <div className='conversation-container flex items-center gap-5'>
                                <TrendingUpIcon />
                              <div className='flex-[0.9] flex-col flex gap-1 justify-around'>
                                 <p className='font-seibold'>Lorem ipsum dolor sit amet</p>
                                 <div className='flex justify-between'>
                                    <p className='text-sm text-gray-600'>2D before</p>
                                    <a className='text-[#6C63FF] hover:underline text-sm'>Read More</a>
                                 </div>  
                               </div>
                            </div>
                            <div className='conversation-container flex items-center gap-5'>
                                <TrendingUpIcon />
                              <div className='flex-[0.9] flex-col flex gap-1 justify-around'>
                                 <p className='font-seibold'>Lorem ipsum dolor sit amet</p>
                                 <div className='flex justify-between'>
                                    <p className='text-sm text-gray-600'>2D before</p>
                                    <a className='text-[#6C63FF] hover:underline text-sm '>Read More</a>
                                 </div>  
                               </div>
                            </div>
                            <div className='conversation-container flex items-center gap-5'>
                                <TrendingUpIcon />
                              <div className='flex-[0.9] flex-col flex gap-1 justify-around'>
                                 <p className='font-seibold'>Lorem ipsum dolor sit amet</p>
                                 <div className='flex justify-between'>
                                    <p className='text-sm text-gray-600'>2D before</p>
                                    <a className='text-[#6C63FF] hover:underline text-sm'>Read More</a>
                                 </div>  
                               </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default UserContainer;