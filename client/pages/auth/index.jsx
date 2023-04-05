import React, { useState } from 'react';
import Head from 'next/head';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  getToken,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { setToken } from '@/utils';

const Index = () => {
  const router = useRouter();
  const token = getToken();
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const bg = useColorModeValue('white', '#1d1d1d');
  const { watch, register, handleSubmit } = useForm();

  const onSubmit = async () => {
    const data = {
      username: watch('username'),
      email: watch('email'),
      password: watch('password'),
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    };

    if (open) {
      await fetch('http://localhost:5000/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(() => {
          setIsAdd(!isAdd);
        });
    }

    if (!open) {
      await fetch('http://localhost:5000/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setToken(data.result.token);
          router.push('/');
        });
    }
  };

  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <Box
          shadow="md"
          rounded={'lg'}
          paddingY={['3', '10']}
          paddingX={['0', '8']}
          bg={bg}
        >
          <Container w={['sm']}>
            <Text
              mb={isAdd ? 2 : 8}
              fontSize={['lg', 'lg', '2xl', '2xl']}
              fontWeight="bold"
            >
              Authentication
            </Text>

            {isAdd && (
              <Alert status="success" variant="top-accent" mb={5}>
                <AlertIcon />
                Sign Up sucess, please login !
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexDirection="column" gap={5}>
                {open ? (
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      {...register('username')}
                      type="name"
                      placeholder="Username"
                    />
                  </FormControl>
                ) : null}

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="user@example.com"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="password"
                  />
                </FormControl>
              </Box>

              <Box mt={8}>
                <Button
                  type="submit"
                  bg="gray.900"
                  color={'white'}
                  width="100%"
                  _hover={{ bg: 'gray.700' }}
                >
                  Submit
                </Button>

                <Box mt={5}>
                  <Text textAlign="center">
                    {open ? 'Already have account ? ' : "Don't have account ? "}{' '}
                    <Box
                      onClick={() => {
                        setOpen(!open);
                        setIsAdd(false);
                      }}
                      fontWeight="bold"
                      cursor="pointer"
                    >
                      {open ? 'Sign In' : 'Sign Up'}
                    </Box>
                  </Text>
                </Box>
              </Box>
            </form>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Index;
