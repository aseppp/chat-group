import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Channel = ({ title, description, username, members }) => {
  return (
    <>
      <Box>
        <Text mb={5} textTransform="uppercase" fontWeight={'bold'}>
          {title}
        </Text>
        <Text>{description}</Text>

        <Box mt={8}>
          <Box>
            <Text>MEMBERS</Text>

            {members?.map((item, key) => (
              <Box
                key={key}
                display="flex"
                alignItems="center"
                gap={5}
                cursor="pointer"
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
                  {username}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Channel;
