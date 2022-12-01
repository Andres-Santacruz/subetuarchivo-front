import { Flex } from '@chakra-ui/react';
import React from 'react'
import FilesFloating from './FilesFloating';
import FloatingButton from './FloatingButton';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}: {children : JSX.Element}) => {
  return (
    <div>
      <Flex direction="column" scrollBehavior="smooth">
        <Header />
        <FilesFloating path="../assets/imgs/files/" />
        {children}
        <FloatingButton />
        <Footer />
      </Flex>
    </div>
  );
}

export default Layout