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
  FormLabel,
  useColorModeValue,
  Button,
  Textarea,
  Box,
} from '@chakra-ui/react';
import React from 'react';

const ModalAdd = ({ isOpen, onClose }) => {
  const bg1 = useColorModeValue('gray.200', '#120F13');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bg1}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl>
              <Input type="name" placeholder="Channel name" bg="#3C393F" />
            </FormControl>

            <FormControl mt={5}>
              <Textarea placeholder="Channel description" bg="#3C393F" />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAdd;
