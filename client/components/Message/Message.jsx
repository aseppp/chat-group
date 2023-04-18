import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';

const Message = () => {
  return (
    <>
      <Box display={'flex'} gap={5}>
        <Box>
          <Image
            borderRadius='7px'
            boxSize='40px'
            src={`https://ui-avatars.com/api/?background=3C393F&color=ffff&name=AsepSaepudin`}
            alt=''
          />
        </Box>

        <Box>
          <Box display={'flex'} gap={3} alignItems='center'>
            <Text
              lineHeight={'25px'}
              fontWeight='700'
              color={'#828282'}
              fontSize={'18px'}
            >
              Message
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
              Hello world !!
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Message;
