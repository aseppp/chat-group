import { clear, onAdd } from '@/app/features/channelSlice';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  FormControl,
  useColorModeValue,
  Button,
  Textarea,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ModalAdd = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const bg1 = useColorModeValue('gray.200', '#120F13');

  const onSubmit = async () => {
    const data = {
      title: title,
      description: desc,
    };

    if (title && desc !== '') {
      await fetch(`http://localhost:5000/channel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(() => {
        dispatch(onAdd());
      });
    }

    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bg1}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <FormControl>
              <Input
                required={true}
                onChange={(e) => setTitle(e.target.value)}
                type='name'
                placeholder='Channel name'
                bg='#3C393F'
              />
            </FormControl>

            <FormControl mt={5}>
              <Textarea
                required={true}
                onChange={(e) => setDesc(e.target.value)}
                placeholder='Channel description'
                bg='#3C393F'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
                onClose();
                dispatch(clear());
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalAdd;
