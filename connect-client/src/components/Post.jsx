import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Photo from '../assets/adarsh_photo.jpeg';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Button from '@mui/material/Button';
import Picker from 'emoji-picker-react';


const Post = () => {
    const [postMessage, setPostMessage] = useState('');
    const [emojipicker, setEmojipicker] = useState(false);
     const navigate = useNavigate();
    const onEmojiClick = (EmojiClickData, e) => {
        console.log(EmojiClickData);
        setPostMessage((prev) => prev + EmojiClickData.emoji);
        setEmojipicker(false);
    };
   const closeHandler = () =>{
        navigate('/welcome');
   }
    return (
        <div className="signup-container ">
            <div className="new-post scale-up-center flex flex-col relative">
                <div className="flex-[0.1] flex justify-between">
                    <div className="flex gap-3 items-center">
                        <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-500">
                            <img src={Photo} width={64} alt="User Avatar" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">Adarsh Srivastava</h1>
                            <p className="text-sm text-gray-500">Post to connections</p>
                        </div>
                    </div>
                    <div>
                        <IconButton onClick={closeHandler}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="flex-[0.8]">
                    <textarea
                        value={postMessage}
                        onChange={(e) => setPostMessage(e.target.value)}
                        className="w-full h-full bg-[#f4f5f8] pl-5 pt-3 outline-none"
                        placeholder="Start Typing Here..."
                    />
                </div>
                <hr />
                <div className="flex-[0.1] flex justify-between -mt-3">
                    <div className="flex gap-1">
                        <IconButton onClick={() => setEmojipicker((val) => !val)}>
                            <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton>
                            <InsertLinkIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#6C63FF',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#5a52e0' },
                            }}
                        >
                            Post
                        </Button>
                    </div>
                </div>
                <div className='absolute -translate-x-96 translate-y-10'>
                    {emojipicker && (
                        <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;
