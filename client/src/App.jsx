import React, { useState } from 'react'
import {StreamChat} from 'stream-chat';
import { Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import 'stream-chat-react/dist/css/index.css';
import './App.css'
import { ChannelContainer, ChannelListContainer,Auth } from './components';
 const apiKey = '649pd387cear';
const cookies = new Cookies();  
const authToken = cookies.get('token');
 const client = StreamChat.getInstance(apiKey);
 if(authToken){
     client.connectUser({
         id:cookies.get('userId'),
         name:cookies.get('userName'),
         fullName:cookies.get('fullName'),
         image:cookies.get('avtarURL'),
         token: cookies.get('token'),
         hashedPassword: cookies.get('hashedPassword'),
         phoneNumber:cookies.get('phoneNumber')
     },authToken);
 }
const App  = () => {
    const [createType,setCreateType] = useState('');
    const [isCreating,setIsCreating] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    if(!authToken) return <Auth />
    return (
        <div className='app__wrapper'>
        <Chat client={client} theme='team light'>
            <ChannelListContainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
            /> {/*This is basically our sidebar */}

            <ChannelContainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                createType={createType}
            />
        </Chat>
        </div>
    )
}


export default App;