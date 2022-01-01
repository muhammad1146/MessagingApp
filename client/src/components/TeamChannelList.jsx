import React from 'react'
import { AddChannel } from '../assets'

const TeamChannelList = ({setToggleContainer, children,error=false, 
    loading, type , isCreating,setIsCreating,setCreateType,setIsEditing}) => {
    if(error){
        return type==='team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>connection error, please try again!</p>
            </div>
        ): (null);
    }
    if (loading) {
        return (
        <div className='team-channel-list'>
        <p className='team-channel-list__message'>
        {type==='team' ? 'channels' : 'message'} loading
        </p>
        </div>
    )
    } 
    return (
        <div className='team-channel-list'>
            <div className='team-channel-list__header'>
                <p className='team-channel-list__header__title'>
                    {type==='team' ? 'Channels' : 'Direct Messages'}
                </p>
                {// ?Button -add Channel 
                }
                <AddChannel 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type={type==='team' ? "team" : "messaging"}
                />
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList
