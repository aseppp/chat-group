import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Text } from '@chakra-ui/react';

const Header = ({ title }) => {
  const bg2 = useColorModeValue('gray.200', '#252329');

  return (
    <Flex
      alignItems={'center'}
      justifyContent='space-between'
      px={10}
      py={3}
      bg={bg2}
      shadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <Text fontWeight={'medium'} lineHeight={'25px'}>
        {title ? title : 'Chat Group App'}
      </Text>
    </Flex>
  );
};

export default Header;
