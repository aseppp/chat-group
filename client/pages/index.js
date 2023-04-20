import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '@/components/Message/Message';
import { io } from 'socket.io-client';
import { loadMessage } from '@/app/features/messageSlice';

export default function Home() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.user);
  const messages = useSelector((state) => state.message);
  const channel = useSelector((state) => state.channel);
  const global = useSelector((state) => state.global);
  const bg2 = useColorModeValue('gray.200', '#252329');
  const socket = io(process.env.NEXT_APP_BASE_URL);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('messages', (data) => {
      dispatch(loadMessage(data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = async () => {
    const data = {
      text: message,
      authorId: user.user.id,
      channelId: channel.dataById.id,
    };

    await fetch(`${process.env.NEXT_APP_BASE_URL}/api/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => {
      dispatch(loadMessage());
    });

    socket.emit('load message', channel.dataById.id);
  };

  return (
    <>
      <Head>
        <title>Chat - Group</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box width='100%' pl={['0', '320px']} bg={bg2}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          height='100vh'
        >
          <Box>
            <Header title={channel?.dataById?.title} />
          </Box>

          <Box
            px={10}
            flex={1}
            py={10}
            display={'flex'}
            flexDirection={'column'}
            gap={5}
            overflowY={'scroll'}
          >
            {messages?.messages?.length === 0 ? (
              <Text>No messages !</Text>
            ) : (
              messages?.messages?.map((item, key) => (
                <Box key={key}>
                  <Message
                    username={item?.author?.username}
                    message={item?.text}
                    avatar={`https://ui-avatars.com/api/?background=3C393F&color=ffff&name=${item?.author?.username}`}
                  />
                </Box>
              ))
            )}
          </Box>

          <Box pb={8} px={9} pt={3}>
            <InputGroup size='lg'>
              <Input
                pr='4.5rem'
                placeholder='Enter password'
                bg={'#3C393F'}
                border='none'
                fontSize={'sm'}
                onChange={(e) => setMessage(e.target.value)}
              />

              <InputRightElement width='4.5rem'>
                <Button onClick={() => onSubmit()} size='sm'>
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
}
