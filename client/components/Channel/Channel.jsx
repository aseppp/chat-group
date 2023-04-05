import { Box, Text, Image } from '@chakra-ui/react';
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
          <Text>MEMBERS</Text>

          {members?.length > 0 ? (
            <Box mt={5} display="flex" flexDirection="column" gap={5}>
              {members?.map((item, key) => (
                <Box key={key} display="flex" alignItems="center" gap={5}>
                  <Image
                    borderRadius="7px"
                    boxSize="40px"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />

                  <Text
                    fontSize={'md'}
                    textTransform="capitalize"
                    fontWeight="bold"
                  >
                    {item.user.username}
                  </Text>
                </Box>
              ))}
            </Box>
          ) : (
            <Text mt={'56'} fontWeight="bold">
              No members in this channel
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Channel;
