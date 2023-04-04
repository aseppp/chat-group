import React from 'react';

const Navbar = ({ channelName }) => {
  return (
    <>
      <header>
        <div>{channelName}</div>
      </header>
    </>
  );
};

export default Navbar;
