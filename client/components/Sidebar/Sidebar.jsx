import React, { useEffect, useState } from 'react';
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
import { BiPlus, BiSearchAlt } from 'react-icons/bi';
import { MdArrowBackIosNew } from 'react-icons/md';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ModalAdd from '../Modal/ModalAdd';
import Channel from '../Channel/Channel';
import { getUser } from '@/utils';

const Sidebar = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState();
  const [dataChannel, setDataChannel] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [participants, setParticipants] = useState([]);
  const bg1 = useColorModeValue('gray.200', '#120F13');
  const bg2 = useColorModeValue('gray.200', '#0B090C');
  const modal = useDisclosure();

  const userData = getUser();

  useEffect(() => {
    fetch('http://localhost:5000/channels')
      .then(res => res.json())
      .then(data => {
        setData(data.result.channels);
      });
  }, [setData]);

  useEffect(() => {
    if (openDetail) {
      fetch(`http://localhost:5000/participants/${id}`)
        .then(res => res.json())
        .then(data => {
          setParticipants(data.result.participant);
        });
    }
  }, [openDetail]);

  useEffect(() => {
    if (openDetail) {
      fetch(`http://localhost:5000/channel/${id}`)
        .then(res => res.json())
        .then(data => {
          setDataChannel(data.result.channel);
        });
    }
  }, [openDetail]);

  console.log({ data, participants });

  return (
    <>
      <Box width={'xs'} position="relative">
        {openDetail ? (
          <Flex
            alignItems={'center'}
            px={3}
            py={3}
            bg={bg1}
            shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            position={'absolute'}
            width="100%"
            zIndex={20}
            gap={5}
          >
            <Box
              onClick={() => setOpenDetail(false)}
              display="flex"
              alignItems="center"
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
            justifyContent="space-between"
            px={3}
            py={3}
            bg={bg1}
            shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            position={'absolute'}
            width="100%"
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
          width="100%"
          h="100vh"
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
                  pointerEvents="none"
                  children={<BiSearchAlt />}
                />
                <Input placeholder="Search" bg="#3C393F" />
              </InputGroup>

              <Box mt={10}>
                {data?.length > 0 ? (
                  <Box display="flex" flexDirection="column" gap={8}>
                    {data.map((item, key) => (
                      <Box
                        key={key}
                        display="flex"
                        alignItems="center"
                        gap={5}
                        cursor="pointer"
                        onClick={() => {
                          setId(item.id);
                          setOpenDetail(true);
                        }}
                      >
                        <Image
                          borderRadius="7px"
                          boxSize="40px"
                          src="https://bit.ly/dan-abramov"
                          alt="Dan Abramov"
                        />

                        <Text
                          fontSize={'md'}
                          textTransform="uppercase"
                          fontWeight="medium"
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
          zIndex="10"
          padding={3}
          bottom={0}
          width="xs"
          display={'flex'}
          justifyContent="space-between"
          alignItems="center"
          bg={bg2}
        >
          <Box display={'flex'} gap={5} alignItems="center">
            <Image
              borderRadius="7px"
              boxSize="40px"
              // src={userData.avatar}
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />

            <Text>username</Text>
          </Box>

          <Menu>
            <MenuButton variant={'unstyled'} as={Button}>
              <Icon as={ChevronDownIcon} />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <ModalAdd isOpen={modal.isOpen} onClose={modal.onClose} />
    </>
  );
};

export default Sidebar;
