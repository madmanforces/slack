import Channel from '@pages/Channel';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { VFC, useCallback, useState, useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router';
import useSWR from 'swr';
import {
    AddButton,
    Channels,
    Chats,
    Header,
    LogOutButton,
    MenuScroll,
    ProfileImg,
    ProfileModal,
    RightMenu,
    WorkspaceButton,
    WorkspaceModal,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
  } from '@layouts/Workspace/styles';
  import Menu from '@components/Menu';
  import gravatar from 'gravatar';
  import { IChannel, IUser } from '@typings/db';
  import { Link } from 'react-router-dom';
import DirectMessage from '@pages/DirectMessage';
import useInput from '@hooks/useInput';
 


const Workspace: VFC = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
    const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [newWorkspace, onChangeNewWorkspace, setNewWorkpsace] = useInput('');
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');
  
    const { workspace } = useParams<{ workspace: string }>();
    const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
      dedupingInterval: 2000, // 2초
    });
    const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
    const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);
    
  
    const onLogout = useCallback(() => {
      axios
        .post('/api/users/logout', null, {
          withCredentials: true,
        })
        .then(() => {
          mutate(false, false);
        });
    }, []);
  
    const onCloseUserProfile = useCallback((e) => {
      e.stopPropagation();
      setShowUserMenu(false);
    }, []);
  
    const onClickUserProfile = useCallback(() => {
      setShowUserMenu((prev) => !prev);
    }, []);
  
    const onClickCreateWorkspace = useCallback(() => {
      setShowCreateWorkspaceModal(true);
    }, []);
  
  
    const onCloseModal = useCallback(() => {
      setShowCreateWorkspaceModal(false);
      setShowCreateChannelModal(false);
      setShowInviteWorkspaceModal(false);
      setShowInviteChannelModal(false);
    }, []);
  
    const toggleWorkspaceModal = useCallback(() => {
      setShowWorkspaceModal((prev) => !prev);
    }, []);
  
    const onClickAddChannel = useCallback(() => {
      setShowCreateChannelModal(true);
    }, []);
  
    const onClickInviteWorkspace = useCallback(() => {
      setShowInviteWorkspaceModal(true);
    }, []);  

    if (!userData) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname}/>
                        {showUserMenu && (
                            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(userData.nickname, {s: '36px', d: 'retro' })} alt={userData.nickname} />
                                    <div>
                                      <span id="profile-name">{userData.nickname}</span>
                                      <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                            </Menu>
                        )}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>
                    {userData?.Workspaces.map((ws) => {
                        return (
                            <Link key={ws.id} to={`/workspace/channel`}>
                                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                            </Link>
                        )
                    })}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>
                <Channels>
                    <WorkspaceName onClick={toggleWorkspaceModal}>Slack</WorkspaceName>
                    <MenuScroll>
                        <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
                        <WorkspaceModal>
                            <h2>Slack</h2>
                            <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                            <button onClick={onClickAddChannel}>채널 만들기</button>
                            <button onClick={onLogout}>로그아웃</button>
                            </WorkspaceModal>
                        </Menu>
                        
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/channel" component={Channel} />
                        <Route path="/workspace/dm" component={DirectMessage} />
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
        </div>
    );
}

export default Workspace