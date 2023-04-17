import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ModalAdd from '../Modal/ModalAdd';
import Channel from '../Channel/Channel';
import { useRouter } from 'next/router';
import { BiPlus, BiSearchAlt } from 'react-icons/bi';
import { MdArrowBackIosNew } from 'react-icons/md';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/app/features/userSlice';
import { loadData, loadDatas } from '@/app/features/channelSlice';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [data, setData] = useState();
  const [dataChannel, setDataChannel] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [participants, setParticipants] = useState([]);

  const bg1 = useColorModeValue('gray.200', '#120F13');
  const bg2 = useColorModeValue('gray.200', '#0B090C');
  const modal = useDisclosure();

  const user = useSelector((state) => state.user);
  const channel = useSelector((state) => state.channel);

  useEffect(() => {
    fetch('http://localhost:5000/channels')
      .then((res) => res.json())
      .then((data) => {
        setData(data.result.channels);
        dispatch(loadDatas(data.result.channels));
      });
  }, [setData, channel.isAdd]);

  useEffect(() => {
    if (openDetail) {
      fetch(`http://localhost:5000/participants/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setParticipants(data?.result?.participant);
        });
    }
  }, [openDetail]);

  useEffect(() => {
    if (openDetail) {
      fetch(`http://localhost:5000/channel/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDataChannel(data?.result?.channel);
          dispatch(loadData(data.result.channel));
        });
    }
  }, [openDetail]);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    router.push('/auth');
  };

  return (
    <>
      <Box width={'xs'} position='relative'>
        {openDetail ? (
          <Flex
            alignItems={'center'}
            px={3}
            py={3}
            bg={bg1}
            shadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
            position={'absolute'}
            width='100%'
            zIndex={20}
            gap={5}
          >
            <Box
              onClick={() => setOpenDetail(false)}
              display='flex'
              alignItems='center'
            >
              <Icon as={MdArrowBackIosNew} />
            </Box>

            <Text fontWeight={'bold'} lineHeight={'25px'}>
              All channels
            </Text>
          </Flex>
        ) : (
          <Flex
            alignItems={'center'}
            justifyContent='space-between'
            px={3}
            py={3}
            bg={bg1}
            shadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
            position={'absolute'}
            width='100%'
            zIndex={20}
          >
            <Text fontWeight={'bold'} lineHeight={'25px'}>
              Channels
            </Text>

            <Box onClick={modal.onOpen}>
              <Icon as={BiPlus} />
            </Box>
          </Flex>
        )}

        <Box
          pt={20}
          px={8}
          bg={bg1}
          width='100%'
          h='100vh'
          position={'absolute'}
          zIndex={10}
        >
          {openDetail ? (
            <Channel
              title={dataChannel?.title}
              description={dataChannel?.description}
              members={participants}
            />
          ) : (
            <>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<BiSearchAlt />}
                />
                <Input placeholder='Search' bg='#3C393F' />
              </InputGroup>

              <Box mt={10}>
                {data?.length > 0 ? (
                  <Box display='flex' flexDirection='column' gap={8}>
                    {data.map((item, key) => (
                      <Box
                        key={key}
                        display='flex'
                        alignItems='center'
                        gap={5}
                        cursor='pointer'
                        onClick={() => {
                          setId(item.id);
                          setOpenDetail(true);
                        }}
                      >
                        <Image
                          borderRadius='7px'
                          boxSize='40px'
                          src={`https://ui-avatars.com/api/?background=3C393F&color=ffff&name=${item.title}`}
                          alt=''
                        />

                        <Text
                          fontSize={'md'}
                          textTransform='uppercase'
                          fontWeight='medium'
                        >
                          {item.title}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </>
          )}
        </Box>

        <Box
          position={'fixed'}
          zIndex='10'
          padding={3}
          bottom={0}
          width='xs'
          display={'flex'}
          justifyContent='space-between'
          alignItems='center'
          bg={bg2}
        >
          <Box display={'flex'} gap={5} alignItems='center'>
            <Image
              borderRadius='7px'
              boxSize='40px'
              src={user.user.avatar}
              alt=''
            />

            <Text>{user.user.username}</Text>
          </Box>

          <Menu>
            <MenuButton variant={'unstyled'} as={Button}>
              <Icon as={ChevronDownIcon} />
            </MenuButton>
            <MenuList bg={bg2}>
              <MenuItem bg={bg2} _hover={{ bg: bg1 }}>
                Profile
              </MenuItem>
              <MenuItem bg={bg2} _hover={{ bg: bg1 }} onClick={() => logOut()}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <ModalAdd isOpen={modal.isOpen} onClose={modal.onClose} />
    </>
  );
};

export default Sidebar;
