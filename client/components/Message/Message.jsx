import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';

const Message = ({ username, message, avatar }) => {
  return (
    <>
      <Box display={'flex'} gap={5}>
        <Box>
          <Image borderRadius='7px' boxSize='40px' src={avatar} alt='' />
        </Box>

        <Box>
          <Box display={'flex'} gap={3} alignItems='center'>
            <Text
              lineHeight={'25px'}
              fontWeight='700'
              color={'#828282'}
              fontSize={'18px'}
            >
              {username}
            </Text>

            <Text
              lineHeight={'25px'}
              fontWeight='700'
              color={'#828282'}
              fontSize={'14px'}
            >
              today at 1:29 PM
            </Text>
          </Box>

          <Box mt={2}>
            <Text lineHeight={'25px'} color={'#E0E0E0'}>
              {message}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Message;
