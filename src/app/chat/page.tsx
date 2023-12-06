import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ChatClient from './ChatClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'next-market-Chat',
  description: 'practice create next app',
};

const ChatPage = async () => {
  const currentUser = await getCurrentUser();
  return <ChatClient currentUser={currentUser} />;
};

export default ChatPage;
