import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Button, Flex, Text, Icon } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { onclose } from '@/app/features/globalSlice';
import { FiMenu } from 'react-icons/fi';

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const bg2 = useColorModeValue('gray.200', '#252329');

  return (
    <Flex
      alignItems={'center'}
      height={'14'}
      bg={bg2}
      shadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <Box display={['flex', 'flex', 'none']}>
        <Button
          onClick={() => dispatch(onclose())}
          size={'sm'}
          variant={'unstyled'}
        >
          <Icon as={FiMenu} w={6} h={6} />
        </Button>
      </Box>

      <Box display={'flex'} alignItems={'center'}>
        <Text fontWeight={'medium'} lineHeight={'25px'} px={['3', '10']}>
          {title ? title : 'Chat Group App'}
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
