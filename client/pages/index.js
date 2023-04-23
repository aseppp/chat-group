import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import Message from '@/components/Message/Message';
import { loadMessage } from '@/app/features/messageSlice';
import { io } from 'socket.io-client';
import { useForm } from 'react-hook-form';

export default function Home() {
  // const socket = io('https://chat-group-me.vercel.app/', {
  //   transports: ['websocket', 'polling'],
  // });
  const socket = io('https://chat-group-me.vercel.app/');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const messages = useSelector((state) => state.message);
  const channel = useSelector((state) => state.channel);
  const bg2 = useColorModeValue('gray.200', '#252329');

  console.log(channel);

  const { register, watch, setValue } = useForm();

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');

    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('messages', (data) => {
      dispatch(loadMessage(data));
    });

    return () => {
      socket.disconnect();
    };
  };

  const onSubmit = async () => {
    const data = {
      text: watch('text'),
      authorId: user.user.id,
      channelId: channel.dataById.id,
    };

    await fetch(`/api/message/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => {
      dispatch(loadMessage());
    });

    socket.emit('load message', channel.dataById.id);
    setValue('text', '');
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
                {...register('text')}
              />

              <InputRightElement width='4.5rem'>
                <Button
                  isDisabled={channel.isOpen == false}
                  onClick={() => onSubmit()}
                  size='sm'
                >
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
